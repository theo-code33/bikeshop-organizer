import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskProductItemModule } from '../task-product-item/task-product-item.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TaskProductItemModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
