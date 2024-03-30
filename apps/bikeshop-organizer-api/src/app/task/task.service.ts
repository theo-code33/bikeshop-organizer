import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const taskCreated = await this.taskRepository.save(createTaskDto);
    const task = await this.findOne(taskCreated.id);
    return task;
  }

  async findAllByTaskCategory(taskCategoryId: string) {
    return await this.taskRepository.find({
      where: {
        taskCategory: {
          id: taskCategoryId,
        },
      },
      relations: ['taskCategory', 'taskCategoryStatus', 'bike'],
    });
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['taskCategory', 'taskCategoryStatus', 'bike'],
    });
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(id, updateTaskDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.taskRepository.delete(id);
  }
}
