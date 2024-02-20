import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bike } from './entities/bike.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BikeService {
  constructor(
    @InjectRepository(Bike)
    private readonly bikeRepository: Repository<Bike>
  ) {}

  async create(createBikeDto: CreateBikeDto) {
    return await this.bikeRepository.save(createBikeDto);
  }

  async findAllByClient(clientId: string) {
    return await this.bikeRepository.find({
      where: { client: { id: clientId } },
      relations: ['client', 'brand'],
    });
  }

  async findOne(id: string) {
    const bike = await this.bikeRepository.findOne({
      where: { id },
      relations: ['client', 'brand'],
    });
    if (!bike) {
      throw new HttpException('Bike not found', HttpStatus.NOT_FOUND);
    }
    return bike;
  }

  async update(id: string, updateBikeDto: UpdateBikeDto) {
    await this.bikeRepository.update(id, updateBikeDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.bikeRepository.delete(id);
  }
}
