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
    const clientCreated = await this.clientRepository.save(createClientDto);
    const client = await this.findOne(clientCreated.id);
    return client;
  }

  async findAllByShop(shopId: string) {
    return await this.clientRepository.find({
      where: { shop: { id: shopId } },
      relations: ['shop', 'bikes', 'bikes.brand'],
    });
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['shop', 'bikes', 'bikes.brand'],
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

  async remove(id: string) {
    return await this.clientRepository.delete(id);
  }
}
