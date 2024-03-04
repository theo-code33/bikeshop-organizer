import { Module } from '@nestjs/common';
import { TaskCategoryStatusService } from './task-category-status.service';
import { TaskCategoryStatusController } from './task-category-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskCategoryStatus } from './entities/task-category-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskCategoryStatus])],
  controllers: [TaskCategoryStatusController],
  providers: [TaskCategoryStatusService],
})
export class TaskCategoryStatusModule {}
