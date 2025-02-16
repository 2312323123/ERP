import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private isSavingActive = false;
  private readonly POSTGRES_CONTAINER = process.env.DB_PSQL_SERVICE_NAME;
  private readonly BACKUP_DIR = '/backups';
  private readonly GIT_LOG = process.env.GIT_LOG || 'unknown';
  private readonly GIT_REPO = process.env.GIT_REPO || 'unknown';

  private async saveGitInfo(folderPath: string): Promise<void> {
    const gitInfoFile = path.join(folderPath, 'git-info.txt');
    const gitInfo = `Repository: ${this.GIT_REPO}\n\nGit Information:\n${this.GIT_LOG}`;
    await fs.promises.writeFile(gitInfoFile, gitInfo);
  }

  getHello(): string {
    this.triggerBackup();
    return 'Backup triggered! Check logs for details.';
  }

  private async executeBackup() {
    await this.ensureBackupDirExists();
    const now = new Date();

    // Format for Polish timezone (Europe/Warsaw): YYYY-MM-DD_HH-MM
    const formatter = new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Warsaw',
    });

    // Convert to sortable format
    const parts = formatter.formatToParts(now);
    const timestamp = `${parts[4].value}-${parts[2].value}-${parts[0].value}_${parts[6].value}-${parts[8].value}`;

    const backupFolderName = `backup-${timestamp}`;
    const backupFolderPath = path.join(this.BACKUP_DIR, backupFolderName);

    // Create backup directory
    await fs.promises.mkdir(backupFolderPath, { recursive: true });

    // Save git info
    void this.saveGitInfo(backupFolderPath);

    // PostgreSQL backup
    // const pgBackupFile = path.join(backupFolderPath, 'postgres-backup.sql');
    // const pgBackupCommand = `PGPASSWORD=${process.env.POSTGRES_PASSWORD} pg_dumpall --clean -U ${process.env.POSTGRES_USER} -h ${this.POSTGRES_CONTAINER} -v > ${pgBackupFile}`;

    // MongoDB backup
    const mongoBackupFile = path.join(backupFolderPath, 'mongo-backup');
    const mongoBackupCommand = `mongodump --uri="mongodb://${process.env.SURVEY_SERVICE_MONGO_USER}:${process.env.SURVEY_SERVICE_MONGO_PASSWORD}@mongo:27017/surveys_db" --out=${mongoBackupFile}`;

    // exec(pgBackupCommand, (error, stdout, stderr) => {
    //   if (error) {
    //     this.logger.error(`PostgreSQL backup failed: ${stderr}`);
    //   } else {
    //     this.logger.log(`PostgreSQL backup completed successfully in folder: ${backupFolderName}`);
    //   }
    // });

    exec(mongoBackupCommand, (error, stdout, stderr) => {
      if (error) {
        this.logger.error(`MongoDB backup failed: ${stderr}`);
      } else {
        this.logger.log(`MongoDB backup completed successfully in folder: ${backupFolderName}`);
      }
    });
  }

  async getLatestBackupFileName(): Promise<string> {
    const backupFiles = await this.getBackupFileNames();
    return backupFiles.length > 0 ? backupFiles[0] : '';
  }

  async getBackupFileNames(): Promise<string[]> {
    const readdir = promisify(fs.readdir);
    try {
      const files = await readdir(this.BACKUP_DIR);
      const backupFolders = files.filter((file) => file.startsWith('backup-'));
      return backupFolders.sort().reverse();
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error reading backup directory: ${error.message}`);
      } else {
        this.logger.error('Error reading backup directory: Unknown error');
      }
      return [];
    }
  }

  startAutoBackup(): string {
    this.isSavingActive = true;
    this.logger.log('Auto backups enabled');
    this.triggerBackup();
    return 'Auto backup has been enabled';
  }

  stopAutoBackup(): string {
    this.isSavingActive = false;
    this.logger.log('Automatic backups disabled');
    this.triggerBackup();
    return 'Auto backup has been disabled';
  }

  triggerBackup(): string {
    this.logger.log('Triggering backup...');
    void this.executeBackup();
    return 'Manual backup triggered';
  }

  @Cron('0 5 * * 1') // Every Monday at 5:00 AM
  handleCron() {
    if (this.isSavingActive) {
      this.logger.log('Running scheduled backup...');
      void this.executeBackup();
    }
  }

  getAutoBackupStatus(): boolean {
    return this.isSavingActive;
  }

  private formatPolishDate(folderName: string): string {
    const match = folderName.match(/backup-(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})/);
    if (!match) return 'Brak backupu';

    const [_, year, month, day, hour, minute] = match;

    const monthNames = [
      'stycznia',
      'lutego',
      'marca',
      'kwietnia',
      'maja',
      'czerwca',
      'lipca',
      'sierpnia',
      'września',
      'października',
      'listopada',
      'grudnia',
    ];

    return `${parseInt(day)} ${monthNames[parseInt(month) - 1]} ${year}, ${hour}:${minute}`;
  }
  async getLastBackupDateTime(): Promise<string> {
    try {
      if (!fs.existsSync(this.BACKUP_DIR)) {
        return 'Brak backupu';
      }
      const lastBackup = await this.getLatestBackupFileName();
      if (!lastBackup) {
        return 'Brak backupu';
      }
      return this.formatPolishDate(lastBackup);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error getting last backup datetime: ${error.message}`);
      } else {
        this.logger.error('Error getting last backup datetime: Unknown error');
      }
      return 'Brak backupu';
    }
  }

  private formatSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  private async getFolderSize(folderPath: string): Promise<number> {
    const files = await fs.promises.readdir(folderPath);
    let totalSize = 0;

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stats = await fs.promises.stat(filePath);
      if (stats.isDirectory()) {
        totalSize += await this.getFolderSize(filePath);
      } else {
        totalSize += stats.size;
      }
    }

    return totalSize;
  }

  async getBackupsInfo(): Promise<{
    backupsCount: number;
    lastBackupSize: string;
    totalBackupsSize: string;
    backups: Array<{
      name: string;
      size: string;
      date: string;
    }>;
  }> {
    try {
      const backupFolders = await this.getBackupFileNames();
      const backupsCount = backupFolders.length;

      if (backupsCount === 0) {
        return {
          backupsCount: 0,
          lastBackupSize: '0 B',
          totalBackupsSize: '0 B',
          backups: [],
        };
      }

      const backups = await Promise.all(
        backupFolders.map(async (folder) => {
          const folderPath = path.join(this.BACKUP_DIR, folder);
          const size = await this.getFolderSize(folderPath);
          return {
            name: folder,
            size: this.formatSize(size),
            date: this.formatPolishDate(folder),
          };
        }),
      );

      const lastBackupSize = await this.getFolderSize(path.join(this.BACKUP_DIR, backupFolders[0]));
      const totalSize = await this.getFolderSize(this.BACKUP_DIR);

      return {
        backupsCount,
        lastBackupSize: this.formatSize(lastBackupSize),
        totalBackupsSize: this.formatSize(totalSize),
        backups,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error getting backups info: ${error.message}`);
      } else {
        this.logger.error('Error getting backups info: Unknown error');
      }
      return {
        backupsCount: 0,
        lastBackupSize: '0 B',
        totalBackupsSize: '0 B',
        backups: [],
      };
    }
  }

  async getLastBackupDatetimePlusState(): Promise<{
    lastBackupDatetime: string;
    isAutoBackupActive: boolean;
  }> {
    return {
      lastBackupDatetime: await this.getLastBackupDateTime(),
      isAutoBackupActive: this.isSavingActive,
    };
  }

  private async ensureBackupDirExists(): Promise<void> {
    try {
      await fs.promises.access(this.BACKUP_DIR, fs.constants.F_OK);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Backup directory does not exist: ${error.message}`);
      } else {
        this.logger.error('Backup directory does not exist: Unknown error');
      }
      throw error;
    }
  }

  async restoreFromBackup(folderName: string): Promise<string> {
    try {
      const backupFolderPath = path.join(this.BACKUP_DIR, folderName);

      // Check if backup folder exists
      if (!fs.existsSync(backupFolderPath)) {
        throw new NotFoundException(`Backup folder ${folderName} not found`);
      }

      // PostgreSQL restore
      // const pgBackupFile = path.join(backupFolderPath, 'postgres-backup.sql');
      // if (!fs.existsSync(pgBackupFile)) {
      //   throw new NotFoundException('PostgreSQL backup file not found');
      // }

      // const dropDatabasesCommand = `PGPASSWORD=${process.env.POSTGRES_PASSWORD} psql -U ${process.env.POSTGRES_USER} -h ${this.POSTGRES_CONTAINER} -d postgres -t -c "SELECT 'DROP DATABASE IF EXISTS ' || datname || ' WITH (FORCE);' FROM pg_database WHERE datname NOT IN ('postgres', 'template0', 'template1');" | PGPASSWORD=${process.env.POSTGRES_PASSWORD} psql -U ${process.env.POSTGRES_USER} -h ${this.POSTGRES_CONTAINER} -d postgres`;
      // await new Promise<void>((resolve, reject) => {
      //   exec(dropDatabasesCommand, (error, stdout, stderr) => {
      //     if (error) {
      //       this.logger.error(`Failed to drop databases: ${stderr}`);
      //       reject(new Error(`Failed to drop databases: ${stderr}`));
      //     } else {
      //       this.logger.log('Successfully dropped all databases');
      //       resolve();
      //     }
      //   });
      // });

      // const pgRestoreCommand = `PGPASSWORD=${process.env.POSTGRES_PASSWORD} psql -U ${process.env.POSTGRES_USER} -h ${this.POSTGRES_CONTAINER} -d postgres -f ${pgBackupFile}`;

      // MongoDB restore
      const mongoBackupPath = path.join(backupFolderPath, 'mongo-backup');
      if (!fs.existsSync(mongoBackupPath)) {
        throw new NotFoundException('MongoDB backup folder not found');
      }

      const mongoRestoreCommand = `mongorestore --uri="mongodb://${process.env.SURVEY_SERVICE_MONGO_USER}:${process.env.SURVEY_SERVICE_MONGO_PASSWORD}@mongo:27017/surveys_db" --drop ${mongoBackupPath}/surveys_db`;

      // Execute restores
      // await new Promise<void>((resolve, reject) => {
      //   exec(pgRestoreCommand, (error, stdout, stderr) => {
      //     if (error) {
      //       this.logger.error(`PostgreSQL restore failed: ${stderr}`);
      //       reject(new Error(`PostgreSQL restore failed: ${stderr}`));
      //     } else {
      //       this.logger.log('PostgreSQL restore completed successfully');
      //       resolve();
      //     }
      //   });
      // });

      await new Promise<void>((resolve, reject) => {
        exec(mongoRestoreCommand, (error, stdout, stderr) => {
          if (error) {
            this.logger.error(`MongoDB restore failed: ${stderr}`);
            reject(new Error(`MongoDB restore failed: ${stderr}`));
          } else {
            this.logger.log('MongoDB restore completed successfully');
            resolve();
          }
        });
      });

      return 'Restore completed successfully';
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Restore failed: ${error.message}`);
        throw error;
      }
      throw new Error('Unknown error during restore');
    }
  }
}
