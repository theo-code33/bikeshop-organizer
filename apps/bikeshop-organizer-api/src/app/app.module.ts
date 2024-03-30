import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { MailModule } from './mail/mail.module';
import { ShopModule } from './shop/shop.module';
import { Shop } from './shop/entities/shop.entity';
import { ClientModule } from './client/client.module';
import { Client } from './client/entities/client.entity';
import { BikeModule } from './bike/bike.module';
import { Bike } from './bike/entities/bike.entity';
import { BrandModule } from './brand/brand.module';
import { Brand } from './brand/entities/brand.entity';
import { TaskCategoryModule } from './task-category/task-category.module';
import { TaskCategory } from './task-category/entities/task-category.entity';
import { TaskCategoryStatusModule } from './task-category-status/task-category-status.module';
import { TaskCategoryStatus } from './task-category-status/entities/task-category-status.entity';
import { StatusModule } from './status/status.module';
import { Status } from './status/entities/status.entity';
import { TaskModule } from './task/task.module';
import { Task } from './task/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST ?? 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        User,
        Shop,
        Client,
        Bike,
        Brand,
        TaskCategory,
        TaskCategoryStatus,
        Status,
        Task,
      ],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    MailModule,
    ShopModule,
    ClientModule,
    BikeModule,
    BrandModule,
    TaskCategoryModule,
    TaskCategoryStatusModule,
    StatusModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
