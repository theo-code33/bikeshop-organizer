import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryService } from './product-category.service';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { Shop } from '../shop/entities/shop.entity';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

describe('ProductCategoryService', () => {
  let service: ProductCategoryService;
  let productCategoryRepository: Repository<ProductCategory>;

  const REPOSITORY_PRODUCT_CATEGORY_TOKEN = getRepositoryToken(ProductCategory);
  const mockProductCategoryRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const productCategory: ProductCategory = {
    id: '1',
    name: 'Product Category test',
    shop: {} as Shop,
    products: [],
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCategoryService,
        {
          provide: REPOSITORY_PRODUCT_CATEGORY_TOKEN,
          useValue: mockProductCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<ProductCategoryService>(ProductCategoryService);
    productCategoryRepository = module.get<Repository<ProductCategory>>(
      REPOSITORY_PRODUCT_CATEGORY_TOKEN
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should product category repository be defined', async () => {
    expect(productCategoryRepository).toBeDefined();
  });

  describe('createProductCategory', () => {
    const createProductCategoryDto: CreateProductCategoryDto = {
      name: 'Product Category test',
      shop: {} as Shop,
    };
    it('should create a product category', async () => {
      jest
        .spyOn(productCategoryRepository, 'save')
        .mockResolvedValue(productCategory);
      jest
        .spyOn(productCategoryRepository, 'findOne')
        .mockResolvedValue(productCategory);

      const productCategoryCreated = await service.create(
        createProductCategoryDto
      );
      expect(productCategoryRepository.save).toHaveBeenCalledWith(
        createProductCategoryDto
      );
      expect(productCategoryCreated).toEqual(productCategory);
    });
  });

  describe('findAllByShop', () => {
    it('should find all product categories by shop', async () => {
      jest
        .spyOn(productCategoryRepository, 'find')
        .mockResolvedValue([productCategory]);

      const shopId = '1';

      const productCategories = await service.findAllByShop(shopId);
      expect(productCategoryRepository.find).toHaveBeenCalledWith({
        where: { shop: { id: shopId } },
        relations: ['shop', 'products'],
      });
      expect(productCategories).toEqual([productCategory]);
    });
  });

  describe('findOne', () => {
    it('should find a product category by id', async () => {
      jest
        .spyOn(productCategoryRepository, 'findOne')
        .mockResolvedValue(productCategory);

      const productCategoryId = '1';

      const productCategoryFound = await service.findOne(productCategoryId);
      expect(productCategoryRepository.findOne).toHaveBeenCalledWith({
        where: { id: productCategoryId },
        relations: ['shop', 'products'],
      });
      expect(productCategoryFound).toEqual(productCategory);
    });
  });

  describe('update', () => {
    const updateProductCategoryDto: UpdateProductCategoryDto = {
      name: 'Update Product Category test',
    };
    const productCategoryUpdated: ProductCategory = {
      ...productCategory,
      name: updateProductCategoryDto.name,
    };
    it('should update a product category', async () => {
      jest
        .spyOn(productCategoryRepository, 'update')
        .mockResolvedValue(undefined);
      jest
        .spyOn(productCategoryRepository, 'findOne')
        .mockResolvedValue(productCategoryUpdated);

      const productCategoryId = '1';
      const productCategoryUpdatedFound = await service.update(
        productCategoryId,
        updateProductCategoryDto
      );
      expect(productCategoryRepository.update).toHaveBeenCalledWith(
        productCategoryId,
        updateProductCategoryDto
      );
      expect(productCategoryRepository.findOne).toHaveBeenCalledWith({
        where: { id: productCategoryId },
        relations: ['shop', 'products'],
      });
      expect(productCategoryUpdatedFound).toEqual(productCategoryUpdated);
    });
  });

  describe('remove', () => {
    it('should remove a product category', async () => {
      jest.spyOn(productCategoryRepository, 'delete').mockResolvedValue({
        affected: 1,
        raw: {},
      });

      const productCategoryId = '1';
      const productCategoryDeleted = await service.remove(productCategoryId);
      expect(productCategoryRepository.delete).toHaveBeenCalledWith(
        productCategoryId
      );
      expect(productCategoryDeleted).toEqual({
        affected: 1,
        raw: {},
      });
    });
  });
});
