import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ) {}
  async create(createClientDto: CreateClientDto) {
    return await this.clientRepository.save(createClientDto);
  }

  findAllByShop(shopId: string) {
    return this.clientRepository.find({
      where: { shop: { id: shopId } },
      relations: ['shop'],
    });
  }

  async findOne(id: string) {
    const client = this.clientRepository.findOne({
      where: { id },
      relations: ['shop'],
    });
    if (!client) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    await this.clientRepository.update(id, updateClientDto);
    const client = await this.findOne(id);
    if (!client) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }
    return client;
  }

  remove(id: string) {
    return this.clientRepository.delete(id);
  }
}
