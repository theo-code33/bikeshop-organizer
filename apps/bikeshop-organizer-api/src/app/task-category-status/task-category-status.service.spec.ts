import { Test, TestingModule } from '@nestjs/testing';
import { TaskCategoryStatusService } from './task-category-status.service';
import { Repository } from 'typeorm';
import { TaskCategoryStatus } from './entities/task-category-status.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskCategory } from '../task-category/entities/task-category.entity';
import { CreateTaskCategoryStatusDto } from './dto/create-task-category-status.dto';
import { Status } from '../status/entities/status.entity';

describe('TaskCategoryStatusService', () => {
  let service: TaskCategoryStatusService;
  let taskCategoryStatusRepository: Repository<TaskCategoryStatus>;

  const REPOSITORY_TASK_CATEGORY_STATUS_TOKEN =
    getRepositoryToken(TaskCategoryStatus);
  const mockTaskCategoryStatusRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const taskCategoryStatus: TaskCategoryStatus = {
    id: '1',
    status: {} as unknown as Status,
    order: 1,
    taskCategory: {} as unknown as TaskCategory,
    tasks: [],
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskCategoryStatusService,
        {
          provide: REPOSITORY_TASK_CATEGORY_STATUS_TOKEN,
          useValue: mockTaskCategoryStatusRepository,
        },
      ],
    }).compile();

    service = module.get<TaskCategoryStatusService>(TaskCategoryStatusService);
    taskCategoryStatusRepository = module.get<Repository<TaskCategoryStatus>>(
      REPOSITORY_TASK_CATEGORY_STATUS_TOKEN
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should task category status repository be defined', async () => {
    expect(taskCategoryStatusRepository).toBeDefined();
  });

  describe('createTaskCategoryStatus', () => {
    const createTaskCategoryStatusDto: CreateTaskCategoryStatusDto = {
      status: {} as unknown as Status,
      order: 1,
      taskCategory: {} as unknown as TaskCategory,
    };
    it('should create a task category status', async () => {
      jest
        .spyOn(taskCategoryStatusRepository, 'save')
        .mockResolvedValue(taskCategoryStatus);
      jest
        .spyOn(taskCategoryStatusRepository, 'findOne')
        .mockResolvedValue(taskCategoryStatus);

      const taskCategoryStatusCreated = await service.create(
        createTaskCategoryStatusDto
      );
      expect(taskCategoryStatusRepository.save).toHaveBeenCalledWith(
        createTaskCategoryStatusDto
      );
      expect(taskCategoryStatusRepository.findOne).toHaveBeenCalledWith({
        where: { id: taskCategoryStatus.id },
        relations: ['taskCategory', 'status'],
      });
      expect(taskCategoryStatusCreated).toEqual(taskCategoryStatus);
    });
  });

  describe('findAllByTaskCategory', () => {
    it('should find all task category status by task category', async () => {
      jest
        .spyOn(taskCategoryStatusRepository, 'find')
        .mockResolvedValue([taskCategoryStatus]);
      const taskCategory = '1';
      const taskCategoryStatusFound = await service.findAllByTaskCategory(
        taskCategory
      );
      expect(taskCategoryStatusRepository.find).toHaveBeenCalledWith({
        where: { taskCategory: { id: taskCategory } },
        relations: ['taskCategory', 'status'],
      });
      expect(taskCategoryStatusFound).toEqual([taskCategoryStatus]);
    });
  });

  describe('findOne', () => {
    it('should find a task category status', async () => {
      jest
        .spyOn(taskCategoryStatusRepository, 'findOne')
        .mockResolvedValue(taskCategoryStatus);

      const taskCategoryStatusFound = await service.findOne(
        taskCategoryStatus.id
      );
      expect(taskCategoryStatusRepository.findOne).toHaveBeenCalledWith({
        where: { id: taskCategoryStatus.id },
        relations: ['taskCategory', 'status'],
      });
      expect(taskCategoryStatusFound).toEqual(taskCategoryStatus);
    });
  });

  describe('update', () => {
    it('should update a task category status', async () => {
      jest
        .spyOn(taskCategoryStatusRepository, 'update')
        .mockResolvedValue(undefined);
      jest
        .spyOn(taskCategoryStatusRepository, 'findOne')
        .mockResolvedValue({ ...taskCategoryStatus, order: 2 });

      const taskCategoryStatusUpdated = await service.update(
        taskCategoryStatus.id,
        {
          order: 2,
        }
      );
      expect(taskCategoryStatusRepository.update).toHaveBeenCalledWith(
        taskCategoryStatus.id,
        {
          order: 2,
        }
      );
      expect(taskCategoryStatusRepository.findOne).toHaveBeenCalledWith({
        where: { id: taskCategoryStatus.id },
        relations: ['taskCategory', 'status'],
      });
      expect(taskCategoryStatusUpdated).toEqual({
        ...taskCategoryStatus,
        order: 2,
      });
    });
  });

  describe('remove', () => {
    it('should remove a task category status', async () => {
      jest
        .spyOn(taskCategoryStatusRepository, 'delete')
        .mockResolvedValue(undefined);

      await service.remove(taskCategoryStatus.id);
      expect(taskCategoryStatusRepository.delete).toHaveBeenCalledWith(
        taskCategoryStatus.id
      );
    });
  });
});
