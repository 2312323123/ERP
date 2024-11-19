import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles.decorator';
import { TaskForExport, TaskForImport } from './tasks/interfaces/task.interface';
import { UndefinedCheckPipe } from './pipes/undefined-check.pipe';
import { TasksService } from './tasks/tasks.service';
import { InterestedService } from './interested/interested.service';
import { UserId } from './auth/user-id.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly tasksService: TasksService,
    private readonly interestedService: InterestedService,
  ) {}

  // @Get('/api/newsletter')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Roles('USER')
  @Get('/api/newsletter/tasks')
  async getTasks(): Promise<TaskForExport[] | { msg: string }> {
    return await this.tasksService.getTasks();
  }

  @Roles('USER')
  @Post('/api/newsletter/task')
  async createTask(
    @UserId() userId: string,
    @Body('taskForImport', UndefinedCheckPipe) taskForImport: TaskForImport,
  ): Promise<void> {
    return await this.tasksService.createTask(userId, taskForImport);
  }

  @Roles('USER')
  @Post('/api/newsletter/interested')
  async interested(@UserId() userId: string, @Body('uuid', UndefinedCheckPipe) uuid: string): Promise<void> {
    return await this.interestedService.interested(userId, uuid);
  }

  @Roles('USER')
  @Delete('/api/newsletter/interested')
  async notInterested(@UserId() userId: string, @Body('uuid', UndefinedCheckPipe) uuid: string): Promise<void> {
    return await this.interestedService.notInterested(userId, uuid);
  }
}
