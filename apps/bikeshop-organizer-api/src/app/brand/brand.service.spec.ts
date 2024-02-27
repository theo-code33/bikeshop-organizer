import { Test, TestingModule } from '@nestjs/testing';
import { BrandService } from './brand.service';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Shop } from '../shop/entities/shop.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

describe('BrandService', () => {
  let service: BrandService;
  let brandRepository: Repository<Brand>;

  const REPOSITORY_BRAND_TOKEN = getRepositoryToken(Brand);
  const mockBrandRepository = {
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

  const brand: Brand = {
    id: '1',
    name: 'Brand test',
    shop: shop,
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandService,
        {
          provide: REPOSITORY_BRAND_TOKEN,
          useValue: mockBrandRepository,
        },
      ],
    }).compile();

    service = module.get<BrandService>(BrandService);
    brandRepository = module.get<Repository<Brand>>(REPOSITORY_BRAND_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should brand repository be defined', () => {
    expect(brandRepository).toBeDefined();
  });

  describe('createBrand', () => {
    const createBrandDto: CreateBrandDto = {
      name: brand.name,
      shop: {
        id: shop.id,
      },
    };
    it('should create a brand', async () => {
      jest.spyOn(brandRepository, 'save').mockResolvedValue(brand as Brand);
      jest.spyOn(brandRepository, 'findOne').mockResolvedValue(brand as Brand);

      const brandCreated = await service.create(createBrandDto);
      expect(brandRepository.save).toHaveBeenCalledWith(createBrandDto);
      expect(brandCreated).toEqual(brand);
    });
  });

  describe('findByShop', () => {
    it('should find brands by shop', async () => {
      jest.spyOn(brandRepository, 'find').mockResolvedValue([brand] as Brand[]);

      const brands = await service.findByShop(shop.id);
      expect(brandRepository.find).toHaveBeenCalledWith({
        where: { shop: { id: shop.id } },
      });
      expect(brands).toEqual([brand]);
    });
  });

  describe('findOne', () => {
    it('should find a brand', async () => {
      jest.spyOn(brandRepository, 'findOne').mockResolvedValue(brand as Brand);

      const brandFound = await service.findOne(brand.id);
      expect(brandRepository.findOne).toHaveBeenCalledWith({
        where: { id: brand.id },
        relations: ['shop'],
      });
      expect(brandFound).toEqual(brand);
    });
  });

  describe('update', () => {
    const updateBrandDto: UpdateBrandDto = {
      name: 'Brand test update',
    };
    it('should update a brand', async () => {
      jest.spyOn(brandRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(brandRepository, 'findOne').mockResolvedValue(brand as Brand);

      const brandUpdated = await service.update(brand.id, updateBrandDto);
      expect(brandRepository.update).toHaveBeenCalledWith(
        brand.id,
        updateBrandDto
      );
      expect(brandRepository.findOne).toHaveBeenCalledWith({
        where: { id: brand.id },
        relations: ['shop'],
      });
      expect(brandUpdated).toEqual(brand);
    });
  });

  describe('remove', () => {
    it('should remove a brand', async () => {
      await service.remove(brand.id);
      expect(brandRepository.delete).toHaveBeenCalledWith(brand.id);
    });
  });
});
