import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Shop } from '../shop/entities/shop.entity';
import { User } from '../user/entities/user.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

describe('ClientService', () => {
  let service: ClientService;
  let clientRepository: Repository<Client>;

  const REPOSITORY_CLIENT_TOKEN = getRepositoryToken(Client);
  const mockClientRepository = {
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

  const client: Client = {
    id: '1',
    firstName: 'Client',
    lastName: 'Test',
    phoneNumber: '0123456789',
    email: 'client-test@test.com',
    shop: shop,
    bikes: [],
    address: '1 rue de la paix',
    postalCode: '75000',
    city: 'Paris',
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: REPOSITORY_CLIENT_TOKEN,
          useValue: mockClientRepository,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    clientRepository = module.get<Repository<Client>>(REPOSITORY_CLIENT_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should client repository be defined', () => {
    expect(clientRepository).toBeDefined();
  });

  describe('createClient', () => {
    const createClientDto: CreateClientDto = {
      firstName: client.firstName,
      lastName: client.lastName,
      phoneNumber: client.phoneNumber,
      email: client.email,
      shop: client.shop,
      address: client.address,
      postalCode: client.postalCode,
      city: client.city,
    };
    it('should create a client', async () => {
      jest.spyOn(clientRepository, 'save').mockResolvedValue(client as Client);
      jest
        .spyOn(clientRepository, 'findOne')
        .mockResolvedValue(client as Client);

      const clientCreated = await service.create(createClientDto);
      expect(clientRepository.save).toHaveBeenCalledWith(createClientDto);
      expect(clientCreated).toEqual(client);
    });
  });

  describe('findAllByShop', () => {
    it('should find all clients by shop', async () => {
      jest
        .spyOn(clientRepository, 'find')
        .mockResolvedValue([client] as Client[]);

      const clients = await service.findAllByShop(shop.id);
      expect(clientRepository.find).toHaveBeenCalledWith({
        where: { shop: { id: shop.id } },
        relations: ['shop', 'bikes', 'bikes.brand'],
      });
      expect(clients).toEqual([client]);
    });
  });

  describe('findOne', () => {
    it('should find a client', async () => {
      jest
        .spyOn(clientRepository, 'findOne')
        .mockResolvedValue(client as Client);

      const clientFound = await service.findOne(client.id);
      expect(clientRepository.findOne).toHaveBeenCalledWith({
        where: { id: client.id },
        relations: ['shop', 'bikes', 'bikes.brand'],
      });
      expect(clientFound).toEqual(client);
    });
  });

  describe('update', () => {
    const updateClientDto: UpdateClientDto = {
      firstName: 'Client test update',
    };
    const clientUpdated: Client = {
      ...client,
      firstName: updateClientDto.firstName,
    };
    it('should update a client', async () => {
      jest.spyOn(clientRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(clientRepository, 'findOne').mockResolvedValue(clientUpdated);

      const clientUpdatedFound = await service.update(
        client.id,
        updateClientDto
      );
      expect(clientRepository.update).toHaveBeenCalledWith(
        client.id,
        updateClientDto
      );
      expect(clientRepository.findOne).toHaveBeenCalledWith({
        where: { id: client.id },
        relations: ['shop', 'bikes', 'bikes.brand'],
      });
      expect(clientUpdatedFound).toEqual(clientUpdated);
    });
  });

  describe('remove', () => {
    it('should delete a client', async () => {
      await service.remove(client.id);
      expect(clientRepository.delete).toHaveBeenCalledWith(client.id);
    });
  });
});
