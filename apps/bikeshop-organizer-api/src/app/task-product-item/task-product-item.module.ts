import { Module } from '@nestjs/common';
import { TaskProductItemService } from './task-product-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskProductItem } from './entities/task-product-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskProductItem])],
  providers: [TaskProductItemService],
  exports: [TaskProductItemService],
})
export class TaskProductItemModule {}
