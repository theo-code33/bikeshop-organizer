import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskCategory } from './entities/task-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskCategoryService {
  constructor(
    @InjectRepository(TaskCategory)
    private readonly taskCategoryRepository: Repository<TaskCategory>
  ) {}
  async create(createTaskCategoryDto: CreateTaskCategoryDto) {
    const taskCategoryCreated = await this.taskCategoryRepository.save(
      createTaskCategoryDto
    );
    const taskCategory = await this.findOne(taskCategoryCreated.id);
    return taskCategory;
  }

  async findAllByShop(shopId: string) {
    return await this.taskCategoryRepository.find({
      where: { shop: { id: shopId } },
      relations: ['shop'],
    });
  }

  async findOne(id: string) {
    const taskCategory = await this.taskCategoryRepository.findOne({
      where: { id },
      relations: ['shop'],
    });

    if (!taskCategory) {
      throw new HttpException('TaskCategory not found', HttpStatus.NOT_FOUND);
    }
    return taskCategory;
  }

  async update(id: string, updateTaskCategoryDto: UpdateTaskCategoryDto) {
    await this.taskCategoryRepository.update(id, updateTaskCategoryDto);
    const taskCategory = await this.findOne(id);
    return taskCategory;
  }

  remove(id: string) {
    return this.taskCategoryRepository.delete(id);
  }
}
