import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from './shop.service';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Roles } from '@bikeshop-organizer/types';
import { User } from '../user/entities/user.entity';
import { CreateShopDto } from './dto/create-shop.dto';

describe('ShopService', () => {
  let service: ShopService;
  let shopRepository: Repository<Shop>;

  const REPOSITORY_SHOP_TOKEN = getRepositoryToken(Shop);
  const mockShopRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const user: User = {
    id: '1',
    email: 'test-unitaire@test.com',
    role: Roles.USER,
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  const shop: Shop = {
    id: '1',
    user: user,
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopService,
        {
          provide: REPOSITORY_SHOP_TOKEN,
          useValue: mockShopRepository,
        },
      ],
    }).compile();

    service = module.get<ShopService>(ShopService);
    shopRepository = module.get<Repository<Shop>>(REPOSITORY_SHOP_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should shop repository be defined', () => {
    expect(shopRepository).toBeDefined();
  });

  describe('createShop', () => {
    const createShopDto: CreateShopDto = {
      user: {
        id: shop.user.id,
      },
      name: shop.name,
      siret: shop.siret,
      address: shop.address,
      postalCode: shop.postalCode,
      city: shop.city,
      email: shop.email,
      phoneNumber: shop.phoneNumber,
    };
    it('should create a shop', async () => {
      jest.spyOn(shopRepository, 'save').mockResolvedValue(shop as Shop);
      jest.spyOn(shopRepository, 'findOne').mockResolvedValue(shop as Shop);

      const shopCreated = await service.create(createShopDto);
      expect(shopRepository.save).toHaveBeenCalledWith(createShopDto);
      expect(shopRepository.findOne).toHaveBeenCalledWith({
        where: { id: shop.id },
        relations: ['user', 'clients', 'brands', 'taskCategories'],
      });
      expect(shopCreated).toEqual(shop);
    });
  });

  describe('findOne', () => {
    it('should find a shop', async () => {
      jest.spyOn(shopRepository, 'findOne').mockResolvedValue(shop as Shop);

      const shopFound = await service.findOne(shop.id);
      expect(shopRepository.findOne).toHaveBeenCalledWith({
        where: { id: shop.id },
        relations: ['user', 'clients', 'brands', 'taskCategories'],
      });
      expect(shopFound).toEqual(shop);
    });
  });

  describe('update', () => {
    const updateShopDto = {
      name: 'Shop test update',
    };
    it('should update a shop', async () => {
      jest.spyOn(shopRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(shopRepository, 'findOne').mockResolvedValue(shop as Shop);

      const shopUpdated = await service.update(shop.id, updateShopDto);
      expect(shopRepository.update).toHaveBeenCalledWith(
        shop.id,
        updateShopDto
      );
      expect(shopRepository.findOne).toHaveBeenCalledWith({
        where: { id: shop.id },
        relations: ['user', 'clients', 'brands', 'taskCategories'],
      });
      expect(shopUpdated).toEqual(shop);
    });
  });

  describe('delete', () => {
    it('should delete a shop', async () => {
      jest.spyOn(shopRepository, 'delete').mockResolvedValue(undefined);

      await service.remove(shop.id);
      expect(shopRepository.delete).toHaveBeenCalledWith(shop.id);
    });
  });
});
