import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>
  ) {}

  async create(createStatusDto: CreateStatusDto) {
    const statusCreated = await this.statusRepository.save(createStatusDto);
    const status = await this.findOne(statusCreated.id);
    return status;
  }

  async findAllByTaskCategoryStatus(taskCategoryStatusId: string) {
    return await this.statusRepository.find({
      where: { taskCategoryStatus: { id: taskCategoryStatusId } },
      relations: ['taskCategoryStatus', 'shop'],
    });
  }

  async findAllByShop(shopId: string) {
    return await this.statusRepository.find({
      where: { shop: { id: shopId } },
      relations: ['taskCategoryStatus', 'shop'],
    });
  }

  async findOne(id: string) {
    const status = await this.statusRepository.findOne({
      where: { id },
      relations: ['taskCategoryStatus', 'shop'],
    });
    if (!status) {
      throw new HttpException('Status not found', HttpStatus.NOT_FOUND);
    }
    return status;
  }

  async update(id: string, updateStatusDto: UpdateStatusDto) {
    await this.statusRepository.update(id, updateStatusDto);
    const status = await this.findOne(id);
    return status;
  }

  async remove(id: string) {
    return await this.statusRepository.delete(id);
  }
}
