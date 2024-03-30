import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskCategory } from '../task-category/entities/task-category.entity';
import { TaskCategoryStatus } from '../task-category-status/entities/task-category-status.entity';
import { Bike } from '../bike/entities/bike.entity';

describe('TaskService', () => {
  let service: TaskService;
  let taskRepository: Repository<Task>;

  const REPOSITORY_TASK_TOKEN = getRepositoryToken(Task);
  const mockTaskRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const task: Task = {
    id: '1',
    taskCategory: {} as unknown as TaskCategory,
    taskCategoryStatus: {} as unknown as TaskCategoryStatus,
    bike: {} as unknown as Bike,
    startDate: new Date('2024-02-20T08:59:56.066Z').toString(),
    endDate: new Date('2024-02-20T08:59:56.066Z').toString(),
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: REPOSITORY_TASK_TOKEN,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    taskRepository = module.get<Repository<Task>>(REPOSITORY_TASK_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should task repository be defined', async () => {
    expect(taskRepository).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const createTaskDto = {
        taskCategory: {} as unknown as TaskCategory,
        taskCategoryStatus: {} as unknown as TaskCategoryStatus,
        bike: {} as unknown as Bike,
        startDate: new Date('2024-02-20T08:59:56.066Z').toString(),
        endDate: new Date('2024-02-20T08:59:56.066Z').toString(),
      };
      jest.spyOn(taskRepository, 'save').mockResolvedValue(task);
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(task);
      const taskCreated = await service.create(createTaskDto);
      expect(taskRepository.save).toHaveBeenCalledWith(createTaskDto);
      expect(taskCreated).toEqual(task);
    });
  });

  describe('findAllByTaskCategory', () => {
    it('should find all tasks by task category', async () => {
      const taskCategory = '1';
      jest.spyOn(taskRepository, 'find').mockResolvedValue([task]);
      const tasks = await service.findAllByTaskCategory(taskCategory);
      expect(taskRepository.find).toHaveBeenCalledWith({
        where: {
          taskCategory: {
            id: taskCategory,
          },
        },
        relations: ['taskCategory', 'taskCategoryStatus', 'bike'],
      });
      expect(tasks).toEqual([task]);
    });
  });

  describe('findOne', () => {
    it('should find a task', async () => {
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(task);
      const taskFound = await service.findOne(task.id);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: task.id },
        relations: ['taskCategory', 'taskCategoryStatus', 'bike'],
      });
      expect(taskFound).toEqual(task);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateTaskDto = {
        taskCategory: {} as unknown as TaskCategory,
        taskCategoryStatus: {} as unknown as TaskCategoryStatus,
        bike: {} as unknown as Bike,
        startDate: new Date('2024-02-20T08:59:56.066Z').toString(),
        endDate: new Date('2024-02-20T08:59:56.066Z').toString(),
      };
      jest.spyOn(taskRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(task);
      const taskUpdated = await service.update(task.id, updateTaskDto);
      expect(taskRepository.update).toHaveBeenCalledWith(
        task.id,
        updateTaskDto
      );
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: task.id },
        relations: ['taskCategory', 'taskCategoryStatus', 'bike'],
      });
      expect(taskUpdated).toEqual(task);
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      jest.spyOn(taskRepository, 'delete').mockResolvedValue({
        raw: [],
        affected: 1,
      });
      await service.remove(task.id);
      expect(taskRepository.delete).toHaveBeenCalledWith(task.id);
    });
  });
});
