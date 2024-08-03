import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { CreateTaskProductItemDto } from '../../task-product-item/dto/create-task-product-item.dto';
import { TaskProductItem } from '../../task-product-item/entities/task-product-item.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  products?: (CreateTaskProductItemDto | TaskProductItem)[];
}
