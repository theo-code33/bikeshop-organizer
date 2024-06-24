import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { BikeModule } from '../bike/bike.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), BikeModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
