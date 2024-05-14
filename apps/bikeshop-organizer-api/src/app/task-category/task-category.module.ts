import { Module } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { TaskCategoryController } from './task-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskCategory } from './entities/task-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskCategory])],
  controllers: [TaskCategoryController],
  providers: [TaskCategoryService],
  exports: [TaskCategoryService],
})
export class TaskCategoryModule {}
