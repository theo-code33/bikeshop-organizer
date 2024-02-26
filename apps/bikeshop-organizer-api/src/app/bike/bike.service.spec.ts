import { Test, TestingModule } from '@nestjs/testing';
import { BikeService } from './bike.service';
import { Repository } from 'typeorm';
import { Bike } from './entities/bike.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from '../client/entities/client.entity';
import { Shop } from '../shop/entities/shop.entity';
import { Brand } from '../brand/entities/brand.entity';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';

describe('BikeService', () => {
  let service: BikeService;
  let bikeRepository: Repository<Bike>;

  const REPOSITORY_BIKE_TOKEN = getRepositoryToken(Bike);
  const mockBikeRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const client: Client = {
    id: '1',
    firstName: 'Client',
    lastName: 'Test',
    phoneNumber: '0123456789',
    email: 'client-test@test.com',
    shop: {} as Shop,
    bikes: [],
    address: '1 rue de la paix',
    postalCode: '75000',
    city: 'Paris',
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  const brand: Brand = {
    id: '1',
    name: 'Brand test',
    shop: {} as Shop,
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  const bike: Bike = {
    id: '1',
    brand: brand,
    model: 'Model test',
    color: 'Color test',
    client: client,
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BikeService,
        {
          provide: REPOSITORY_BIKE_TOKEN,
          useValue: mockBikeRepository,
        },
      ],
    }).compile();

    service = module.get<BikeService>(BikeService);
    bikeRepository = module.get<Repository<Bike>>(REPOSITORY_BIKE_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should bike repository be defined', () => {
    expect(bikeRepository).toBeDefined();
  });

  describe('createBike', () => {
    const createBikeDto: CreateBikeDto = {
      brand: {
        id: bike.brand.id,
      },
      model: bike.model,
      color: bike.color,
      client: {
        id: bike.client.id,
      },
    };
    it('should create a bike', async () => {
      jest.spyOn(bikeRepository, 'save').mockResolvedValue(bike as Bike);
      jest.spyOn(bikeRepository, 'findOne').mockResolvedValue(bike as Bike);

      const bikeCreated = await service.create(createBikeDto);
      expect(bikeRepository.save).toHaveBeenCalledWith(createBikeDto);
      expect(bikeCreated).toEqual(bike);
    });
  });

  describe('findAllByClient', () => {
    it('should find all bikes by client', async () => {
      jest.spyOn(bikeRepository, 'find').mockResolvedValue([bike] as Bike[]);

      const bikes = await service.findAllByClient(client.id);
      expect(bikeRepository.find).toHaveBeenCalledWith({
        where: { client: { id: client.id } },
        relations: ['client', 'brand'],
      });
      expect(bikes).toEqual([bike]);
    });
  });

  describe('findOne', () => {
    it('should find a bike', async () => {
      jest.spyOn(bikeRepository, 'findOne').mockResolvedValue(bike as Bike);

      const bikeFound = await service.findOne(bike.id);
      expect(bikeRepository.findOne).toHaveBeenCalledWith({
        where: { id: bike.id },
        relations: ['client', 'brand'],
      });
      expect(bikeFound).toEqual(bike);
    });
  });

  describe('update', () => {
    const updateBikeDto: UpdateBikeDto = {
      model: 'Model test update',
    };
    it('should update a bike', async () => {
      jest.spyOn(bikeRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(bikeRepository, 'findOne').mockResolvedValue(bike as Bike);

      const bikeUpdated = await service.update(bike.id, updateBikeDto);
      expect(bikeRepository.update).toHaveBeenCalledWith(
        bike.id,
        updateBikeDto
      );
      expect(bikeRepository.findOne).toHaveBeenCalledWith({
        where: { id: bike.id },
        relations: ['client', 'brand'],
      });
      expect(bikeUpdated).toEqual(bike);
    });
  });

  describe('remove', () => {
    it('should delete a bike', async () => {
      jest.spyOn(bikeRepository, 'delete').mockResolvedValue(undefined);

      await service.remove(bike.id);
      expect(bikeRepository.delete).toHaveBeenCalledWith(bike.id);
    });
  });
});
