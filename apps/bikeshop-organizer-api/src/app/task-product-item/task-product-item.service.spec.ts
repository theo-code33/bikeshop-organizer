import { Test, TestingModule } from '@nestjs/testing';
import { TaskProductItemService } from './task-product-item.service';
import { Repository } from 'typeorm';
import { TaskProductItem } from './entities/task-product-item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { Task } from '../task/entities/task.entity';
import { CreateTaskProductItemDto } from './dto/create-task-product-item.dto';

describe('TaskProductItemService', () => {
  let service: TaskProductItemService;
  let taskProductItemRepository: Repository<TaskProductItem>;

  const REPOSITORY_TASK_CATEGORY_STATUS_TOKEN = getRepositoryToken(
    TaskProductItemService
  );
  const mockTaskProductItemRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const taskProductItem: TaskProductItem = {
    id: '1',
    quantity: 1,
    product: {} as unknown as Product,
    task: {} as unknown as Task,
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskProductItemService,
        {
          provide: REPOSITORY_TASK_CATEGORY_STATUS_TOKEN,
          useValue: mockTaskProductItemRepository,
        },
      ],
    }).compile();

    service = module.get<TaskProductItemService>(TaskProductItemService);
    taskProductItemRepository = module.get<Repository<TaskProductItem>>(
      REPOSITORY_TASK_CATEGORY_STATUS_TOKEN
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should task product item repository be defined', async () => {
    expect(taskProductItemRepository).toBeDefined();
  });

  describe('createTaskProductItem', () => {
    const createTaskProductItemDto: CreateTaskProductItemDto = {
      quantity: 1,
      product: {} as unknown as Product,
      task: {} as unknown as Task,
    };
    it('should create a task product item', async () => {
      jest
        .spyOn(taskProductItemRepository, 'save')
        .mockResolvedValue(taskProductItem);
      jest
        .spyOn(taskProductItemRepository, 'findOne')
        .mockResolvedValue(taskProductItem);

      const taskProductItemCreated = await service.create(
        createTaskProductItemDto
      );

      expect(taskProductItemRepository.save).toHaveBeenCalledWith(
        createTaskProductItemDto
      );
      expect(taskProductItemRepository.findOne).toHaveBeenCalledWith({
        where: { id: taskProductItem.id },
        relation: ['product', 'task'],
      });
      expect(taskProductItemCreated).toEqual(taskProductItem);
    });
  });

  describe('findAllTask', () => {
    it('should return all task product items', async () => {
      jest
        .spyOn(taskProductItemRepository, 'find')
        .mockResolvedValue([taskProductItem]);

      const taskId = '1';

      const taskProductItems = await service.findAllByTask(taskId);

      expect(taskProductItemRepository.find).toHaveBeenCalledWith({
        where: { task: taskId },
        relations: ['product', 'task'],
      });
      expect(taskProductItems).toEqual([taskProductItem]);
    });
  });

  describe('findOne', () => {
    it('should find a task product item', async () => {
      jest
        .spyOn(taskProductItemRepository, 'findOne')
        .mockResolvedValue(taskProductItem);
      const taskProductItemFound = await service.findOne(taskProductItem.id);

      expect(taskProductItemRepository.findOne).toHaveBeenCalledWith({
        where: { id: taskProductItem.id },
        relation: ['product', 'task'],
      });
      expect(taskProductItemFound).toEqual(taskProductItem);
    });
  });

  describe('update', () => {
    it('should update a task product item', async () => {
      jest
        .spyOn(taskProductItemRepository, 'update')
        .mockResolvedValue(undefined);
      jest
        .spyOn(taskProductItemRepository, 'findOne')
        .mockResolvedValue({ ...taskProductItem, quantity: 2 });

      const taskProductItemUpdated = await service.update(taskProductItem.id, {
        quantity: 2,
      });

      expect(taskProductItemRepository.update).toHaveBeenCalledWith(
        taskProductItem.id,
        { quantity: 2 }
      );
      expect(taskProductItemRepository.findOne).toHaveBeenCalledWith({
        where: { id: taskProductItem.id },
        relation: ['product', 'task'],
      });
      expect(taskProductItemUpdated).toEqual({
        ...taskProductItem,
        quantity: 2,
      });
    });
  });

  describe('remove', () => {
    it('should remove a task product item', async () => {
      jest
        .spyOn(taskProductItemRepository, 'delete')
        .mockResolvedValue(undefined);

      await service.remove(taskProductItem.id);
      expect(taskProductItemRepository.delete).toHaveBeenCalledWith(
        taskProductItem.id
      );
    });
  });
});
