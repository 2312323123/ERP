import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class HstoreInitializerService implements OnModuleInit {
  // hstore is used to store refresh tokens inside the tokens table

  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  async onModuleInit() {
    await this.enableHstoreExtension();
  }

  async enableHstoreExtension(): Promise<void> {
    // Check if the hstore extension already exists
    const result = await this.connection.query(
      "SELECT EXISTS(SELECT 1 FROM pg_extension WHERE extname = 'hstore') AS exists;",
    );

    if (!result[0].exists) {
      // If it doesn't exist, create the extension
      await this.connection.query('CREATE EXTENSION IF NOT EXISTS hstore;');
      console.log('hstore extension has been enabled.');
    } else {
      console.log('hstore extension is already enabled.');
    }
  }
}
