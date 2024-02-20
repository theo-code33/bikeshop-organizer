import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '@bikeshop-organizer/types';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  const REPOSITORY_USER_TOKEN = getRepositoryToken(User);
  const mockUserRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const user = {
    id: '1',
    email: 'test-unitaire@test.com',
    role: Roles.USER,
    createdAt: new Date('2024-02-20T08:59:56.066Z'),
    updatedAt: new Date('2024-02-20T08:59:56.066Z'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: REPOSITORY_USER_TOKEN,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(REPOSITORY_USER_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should user repository be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    const createUserDto: CreateUserDto = {
      email: user.email,
      password: 'password-test',
    };

    it('should create a user', async () => {
      jest.spyOn(userRepository, 'save').mockResolvedValue(user as User);

      const userCreated = await service.create(createUserDto);
      expect(userRepository.save).toHaveBeenCalledWith(createUserDto);
      expect(userCreated).toEqual(user);
    });
  });

  describe('findForLogin', () => {
    const loginDto = {
      email: user.email,
      password: 'password-test',
    };

    const mockFoundedUser = {
      ...user,
      password: 'password-test',
    };

    it('should find a user for login', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(mockFoundedUser as User);
      // jest.mock('bcrypt', () => ({
      //   compare: jest.fn(() => Promise.resolve(true)),
      // }));

      await service.findForLogin(loginDto);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: loginDto.email },
        relations: ['shop', 'shop.clients', 'shop.brands'],
        select: ['id', 'email', 'password', 'role'],
      });
      // expect(userFound).toEqual(user);
    });
  });
  describe('findOne', () => {
    it('should find a user by id', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as User);

      const userFound = await service.findOne(user.id);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
        relations: ['shop', 'shop.clients', 'shop.brands'],
      });
      expect(userFound).toEqual(user);
    });
  });
  describe('findOneByEmail', () => {
    it('should find a user by email', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as User);
      const userFound = await service.findOneByEmail(user.email);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: user.email },
        relations: ['shop', 'shop.clients', 'shop.brands'],
      });
      expect(userFound).toEqual(user);
    });
  });
  describe('findByResetPassword', () => {
    it('should find a user by reset password token', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as User);
      const userFound = await service.findByResetPasswordToken('token');
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { resetPasswordToken: 'token' },
      });
      expect(userFound).toEqual(user);
    });
  });
  describe('update', () => {
    const updateUserDto = {
      email: 'updated-' + user.email,
      password: 'password-test',
    };
    const userUpdatedFound = {
      ...user,
      email: updateUserDto.email,
    };
    it('should update a user', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(userUpdatedFound as User);
      const userUpdated = await service.update(user.id, updateUserDto);
      expect(userRepository.update).toHaveBeenCalledWith(
        user.id,
        updateUserDto
      );
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(userUpdated).toEqual(userUpdatedFound);
    });
  });
  describe('remove', () => {
    it('should remove a user', async () => {
      await service.remove(user.id);
      expect(userRepository.delete).toHaveBeenCalledWith(user.id);
    });
  });
});
