import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from './status.service';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateStatusDto } from './dto/create-status.dto';
import { Shop } from '../shop/entities/shop.entity';

describe('StatusService', () => {
  let service: StatusService;
  let statusRepository: Repository<Status>;

  const REPOSITORY_STATUS_TOKEN = getRepositoryToken(Status);
  const mockStatusRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const status: Status = {
    id: '1',
    name: 'status',
    description: 'description',
    color: '#00FF00',
    shop: {} as unknown as Shop,
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusService,
        {
          provide: REPOSITORY_STATUS_TOKEN,
          useValue: mockStatusRepository,
        },
      ],
    }).compile();

    service = module.get<StatusService>(StatusService);
    statusRepository = module.get<Repository<Status>>(REPOSITORY_STATUS_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should status repository be defined', async () => {
    expect(statusRepository).toBeDefined();
  });

  describe('createStatus', () => {
    const createStatusDto: CreateStatusDto = {
      name: 'status',
      description: 'description',
      color: '#00FF00',
      shop: {} as unknown as Shop,
    };
    it('should create a status', async () => {
      jest.spyOn(statusRepository, 'save').mockResolvedValue(status);
      jest.spyOn(statusRepository, 'findOne').mockResolvedValue(status);

      const statusCreated = await service.create(createStatusDto);
      expect(statusRepository.save).toHaveBeenCalledWith(createStatusDto);
      expect(statusRepository.findOne).toHaveBeenCalledWith({
        where: { id: statusCreated.id },
        relations: ['taskCategoryStatus', 'shop'],
      });
      expect(statusCreated).toEqual(status);
    });
  });

  describe('findAllByTaskCategoryStatus', () => {
    it('should return all status by task category status', async () => {
      jest.spyOn(statusRepository, 'find').mockResolvedValue([status]);

      const statusFound = await service.findAllByTaskCategoryStatus('1');
      expect(statusRepository.find).toHaveBeenCalledWith({
        where: { taskCategoryStatus: { id: '1' } },
        relations: ['taskCategoryStatus', 'shop'],
      });
      expect(statusFound).toEqual([status]);
    });
  });

  describe('findAllByShop', () => {
    it('should return all status by shop', async () => {
      jest.spyOn(statusRepository, 'find').mockResolvedValue([status]);

      const statusFound = await service.findAllByShop('1');
      expect(statusRepository.find).toHaveBeenCalledWith({
        where: { shop: { id: '1' } },
        relations: ['taskCategoryStatus', 'shop'],
      });
      expect(statusFound).toEqual([status]);
    });
  });

  describe('findOne', () => {
    it('should return a status', async () => {
      jest.spyOn(statusRepository, 'findOne').mockResolvedValue(status);
      const statusFound = await service.findOne('1');
      expect(statusRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['taskCategoryStatus', 'shop'],
      });
      expect(statusFound).toEqual(status);
    });
  });

  describe('update', () => {
    it('should update a status', async () => {
      jest.spyOn(statusRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(statusRepository, 'findOne').mockResolvedValue(status);

      const statusUpdated = await service.update('1', {} as CreateStatusDto);

      expect(statusRepository.update).toHaveBeenCalledWith('1', {});
      expect(statusRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['taskCategoryStatus', 'shop'],
      });
      expect(statusUpdated).toEqual(status);
    });
  });

  describe('remove', () => {
    it('should remove a status', async () => {
      jest.spyOn(statusRepository, 'delete').mockResolvedValue(undefined);

      const statusRemoved = await service.remove('1');
      expect(statusRepository.delete).toHaveBeenCalledWith('1');
      expect(statusRemoved).toBeUndefined();
    });
  });
});
