import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskCategoryStatusDto } from './dto/create-task-category-status.dto';
import { UpdateTaskCategoryStatusDto } from './dto/update-task-category-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskCategoryStatus } from './entities/task-category-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskCategoryStatusService {
  constructor(
    @InjectRepository(TaskCategoryStatus)
    private readonly taskCategoryStatusRepository: Repository<TaskCategoryStatus>
  ) {}
  async create(createTaskCategoryStatusDto: CreateTaskCategoryStatusDto) {
    const taskCategoryStatusCreated =
      await this.taskCategoryStatusRepository.save(createTaskCategoryStatusDto);
    const taskCategoryStatus = await this.findOne(taskCategoryStatusCreated.id);
    return taskCategoryStatus;
  }

  async findAllByTaskCategory(taskCategoryId: string) {
    return await this.taskCategoryStatusRepository.find({
      where: { taskCategory: { id: taskCategoryId } },
      relations: ['taskCategory'],
    });
  }

  async findOne(id: string) {
    const taskCategoryStatus = await this.taskCategoryStatusRepository.findOne({
      where: { id },
      relations: ['taskCategory'],
    });
    if (!taskCategoryStatus) {
      throw new HttpException(
        'TaskCategoryStatus not found',
        HttpStatus.NOT_FOUND
      );
    }
    return taskCategoryStatus;
  }

  async update(
    id: string,
    updateTaskCategoryStatusDto: UpdateTaskCategoryStatusDto
  ) {
    await this.taskCategoryStatusRepository.update(
      id,
      updateTaskCategoryStatusDto
    );
    const taskCategoryStatus = await this.findOne(id);
    return taskCategoryStatus;
  }

  remove(id: string) {
    return this.taskCategoryStatusRepository.delete(id);
  }
}
