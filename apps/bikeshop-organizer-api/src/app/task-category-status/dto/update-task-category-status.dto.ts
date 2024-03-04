import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskCategoryStatusDto } from './create-task-category-status.dto';

export class UpdateTaskCategoryStatusDto extends PartialType(
  CreateTaskCategoryStatusDto
) {}
