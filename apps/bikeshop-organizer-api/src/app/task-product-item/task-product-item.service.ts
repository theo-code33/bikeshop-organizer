import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskProductItem } from './entities/task-product-item.entity';
import { Repository } from 'typeorm';
import { CreateTaskProductItemDto } from './dto/create-task-product-item.dto';
import { UpdateTaskProductItemDto } from './dto/update-task-product-item.dto';

@Injectable()
export class TaskProductItemService {
  constructor(
    @InjectRepository(TaskProductItem)
    private readonly taskProductItemRepository: Repository<TaskProductItem>
  ) {}

  async create(createTaskProductItemDto: CreateTaskProductItemDto) {
    const taskProductItemCreated = await this.taskProductItemRepository.save(
      createTaskProductItemDto
    );
    const taskProductItem = await this.findOne(taskProductItemCreated.id);
    return taskProductItem;
  }

  async findAllByTask(taskId: string) {
    return await this.taskProductItemRepository.find({
      where: { task: { id: taskId } },
      relations: ['product', 'product.brand', 'product.category', 'task'],
    });
  }

  async findOne(id: string) {
    const taskProductItem = await this.taskProductItemRepository.findOne({
      where: { id },
      relations: ['product', 'product.brand', 'product.category', 'task'],
    });
    if (!taskProductItem) {
      throw new HttpException(
        'TaskProductItem not found',
        HttpStatus.NOT_FOUND
      );
    }
    return taskProductItem;
  }

  async update(id: string, updateTaskProductItemDto: UpdateTaskProductItemDto) {
    await this.taskProductItemRepository.update(id, updateTaskProductItemDto);
    const taskProductItem = await this.findOne(id);
    return taskProductItem;
  }

  async remove(id: string) {
    return await this.taskProductItemRepository.delete(id);
  }
}
