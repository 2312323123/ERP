import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles.decorator';
import { UndefinedCheckPipe } from './pipes/undefined-check.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // most basic endpoint hello world
  // @Roles('SUPERADMIN')
  @Get('/api/backup_service/hello-world')
  helloWorld(): string {
    return 'hello world';
  }

  // to run when letting in surveys is being turned on
  // @Roles('SUPERADMIN', 'RECRUITMENT_ADMIN')
  @Post('/api/backup_service/start-auto-backup')
  startAutoBackup(): string {
    return this.appService.startAutoBackup();
  }

  // to run when letting in surveys is being turned off
  // @Roles('SUPERADMIN', 'RECRUITMENT_ADMIN')
  @Post('/api/backup_service/stop-auto-backup')
  stopAutoBackup(): string {
    return this.appService.stopAutoBackup();
  }

  // to run when evaluation is being turned off
  // @Roles('SUPERADMIN', 'RECRUITMENT_ADMIN')
  @Post('/api/backup_service/trigger-backup')
  triggerBackup(): string {
    return this.appService.triggerBackup();
  }

  // @Roles('SUPERADMIN', 'KOO_IT')
  @Get('/api/backup_service/last-backup-datetime-plus-state')
  async getLastBackupDatetimePlusState(): Promise<{
    lastBackupDatetime: string;
    isAutoBackupActive: boolean;
  }> {
    return this.appService.getLastBackupDatetimePlusState();
  }

  // @Roles('SUPERADMIN', 'KOO_IT')
  @Get('/api/backup_service/backups-info')
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
    return this.appService.getBackupsInfo();
  }

  // @Roles('SUPERADMIN')
  @Post('/api/backup_service/restore-backup')
  async restoreFromBackup(@Body('folderName', UndefinedCheckPipe) folderName: string): Promise<string> {
    return this.appService.restoreFromBackup(folderName);
  }

  // @Roles('skip')
  // @Post('/api/backup_service/restore-backup')
  // async restoreFromBackup(
  //   @Body('folderName', UndefinedCheckPipe) folderName: string,
  //   @Headers('x-api-key') apiKey: string,
  // ): Promise<string> {
  //   if (apiKey !== process.env.RESTORE_BACKUP_BEARER_TOKEN) {
  //     throw new UnauthorizedException('Invalid API key');
  //   }
  //   return this.appService.restoreFromBackup(folderName);
  // }
}
