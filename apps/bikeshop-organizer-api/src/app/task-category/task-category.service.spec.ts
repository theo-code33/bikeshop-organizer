import { Test, TestingModule } from '@nestjs/testing';
import { TaskCategoryService } from './task-category.service';
import { Repository } from 'typeorm';
import { TaskCategory } from './entities/task-category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { Shop } from '../shop/entities/shop.entity';
import { User } from '../user/entities/user.entity';

describe('TaskCategoryService', () => {
  let service: TaskCategoryService;
  let taskCategoryRepository: Repository<TaskCategory>;

  const REPOSITORY_TASK_CATEGORY_TOKEN = getRepositoryToken(TaskCategory);
  const mockTaskCategoryRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const shop: Shop = {
    id: '1',
    user: {} as User,
    name: 'Shop test',
    siret: '123456789',
    address: '1 rue de la paix',
    postalCode: '75000',
    city: 'Paris',
    email: 'shop-test@test.com',
    phoneNumber: '0123456789',
    clients: [],
    brands: [],
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  const taskCategory: TaskCategory = {
    id: '1',
    name: 'Brakes',
    shop: shop,
    tasks: [],
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskCategoryService,
        {
          provide: REPOSITORY_TASK_CATEGORY_TOKEN,
          useValue: mockTaskCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<TaskCategoryService>(TaskCategoryService);
    taskCategoryRepository = module.get<Repository<TaskCategory>>(
      REPOSITORY_TASK_CATEGORY_TOKEN
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should task category repository be defined', async () => {
    expect(taskCategoryRepository).toBeDefined();
  });

  describe('createTaskCategory', () => {
    const createTaskCategoryDto: CreateTaskCategoryDto = {
      name: 'Brakes',
      shop: { id: '1' },
    };
    it('should create a task category', async () => {
      jest
        .spyOn(taskCategoryRepository, 'save')
        .mockResolvedValue(taskCategory);
      jest
        .spyOn(taskCategoryRepository, 'findOne')
        .mockResolvedValue(taskCategory);
      const taskCategoryCreated = await service.create(createTaskCategoryDto);
      expect(taskCategoryRepository.save).toHaveBeenCalledWith(
        createTaskCategoryDto
      );
      expect(taskCategoryCreated).toEqual(taskCategory);
    });
  });

  describe('findAllByShop', () => {
    it('should find all task categories by shop', async () => {
      jest
        .spyOn(taskCategoryRepository, 'find')
        .mockResolvedValue([taskCategory]);
      const taskCategories = await service.findAllByShop(shop.id);
      expect(taskCategoryRepository.find).toHaveBeenCalledWith({
        where: { shop: { id: shop.id } },
        relations: ['shop'],
      });
      expect(taskCategories).toEqual([taskCategory]);
    });
  });

  describe('findOne', () => {
    it('should find a task category', async () => {
      jest
        .spyOn(taskCategoryRepository, 'findOne')
        .mockResolvedValue(taskCategory);
      const taskCategoryFound = await service.findOne(taskCategory.id);
      expect(taskCategoryRepository.findOne).toHaveBeenCalledWith({
        where: { id: taskCategory.id },
        relations: ['shop'],
      });
      expect(taskCategoryFound).toEqual(taskCategory);
    });
  });

  describe('update', () => {
    it('should update a task category', async () => {
      jest.spyOn(taskCategoryRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(taskCategoryRepository, 'findOne').mockResolvedValue({
        ...taskCategory,
        name: 'Brakes updated',
      });
      const taskCategoryUpdated = await service.update(taskCategory.id, {
        name: 'Brakes updated',
      });
      expect(taskCategoryRepository.update).toHaveBeenCalledWith(
        taskCategory.id,
        {
          name: 'Brakes updated',
        }
      );
      expect(taskCategoryRepository.findOne).toHaveBeenCalledWith({
        where: { id: taskCategory.id },
        relations: ['shop'],
      });
      expect(taskCategoryUpdated.name).toEqual('Brakes updated');
    });
  });

  describe('remove', () => {
    it('should remove a task category', async () => {
      jest.spyOn(taskCategoryRepository, 'delete').mockResolvedValue({
        raw: [],
        affected: 1,
      });
      await service.remove(taskCategory.id);
      expect(taskCategoryRepository.delete).toHaveBeenCalledWith(
        taskCategory.id
      );
    });
  });
});
