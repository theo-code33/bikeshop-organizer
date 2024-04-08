import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Brand } from '../brand/entities/brand.entity';
import { Shop } from '../shop/entities/shop.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategory } from '../product-category/entities/product-category.entity';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<Product>;

  const REPOSITORY_PRODUCT_TOKEN = getRepositoryToken(Product);
  const mockProductRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const product: Product = {
    id: '1',
    name: 'Product test',
    brand: {} as Brand,
    price: 100,
    shop: {} as Shop,
    tasks: [],
    category: {} as ProductCategory,
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: REPOSITORY_PRODUCT_TOKEN,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      REPOSITORY_PRODUCT_TOKEN
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should product repository be defined', async () => {
    expect(productRepository).toBeDefined();
  });

  describe('createProduct', () => {
    const createProductDto: CreateProductDto = {
      name: 'Product test',
      brand: {} as Brand,
      price: 100,
      shop: {} as Shop,
      productCategory: {} as ProductCategory,
    };
    it('should create a product', async () => {
      jest.spyOn(productRepository, 'save').mockResolvedValue(product);
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(product);

      const productCreated = await service.create(createProductDto);
      expect(productRepository.save).toHaveBeenCalledWith(createProductDto);
      expect(productCreated).toEqual(product);
    });
  });

  describe('findAllByShop', () => {
    it('should find all products by shop', async () => {
      jest.spyOn(productRepository, 'find').mockResolvedValue([product]);
      const shopId = '1';
      const products = await service.findAllByShop(shopId);
      expect(productRepository.find).toHaveBeenCalledWith({
        where: { shop: { id: shopId } },
        relations: ['brand', 'shop', 'tasks', 'category'],
      });
      expect(products).toEqual([product]);
    });
  });
  describe('findOne', () => {
    it('should find a product by id', async () => {
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(product);
      const productId = '1';
      const productFound = await service.findOne(productId);
      expect(productRepository.findOne).toHaveBeenCalledWith({
        where: { id: productId },
        relations: ['brand', 'shop', 'tasks', 'category'],
      });
      expect(productFound).toEqual(product);
    });
  });

  describe('update', () => {
    const updateProductDto: UpdateProductDto = {
      name: 'update product test',
    };
    const productUpdated: Product = {
      ...product,
      name: updateProductDto.name,
    };
    it('should update a product', async () => {
      jest.spyOn(productRepository, 'update').mockResolvedValue(undefined);
      jest
        .spyOn(productRepository, 'findOne')
        .mockResolvedValue(productUpdated);

      const productId = '1';
      const productUpdatedFound = await service.update(
        productId,
        updateProductDto
      );
      expect(productRepository.update).toHaveBeenCalledWith(
        productId,
        updateProductDto
      );
      expect(productRepository.findOne).toHaveBeenCalledWith({
        where: { id: productId },
        relations: ['brand', 'shop', 'tasks', 'category'],
      });
      expect(productUpdatedFound).toEqual(productUpdated);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const productId = '1';
      await service.remove(productId);
      expect(productRepository.delete).toHaveBeenCalledWith(productId);
    });
  });
});
