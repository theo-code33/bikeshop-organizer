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
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductCategory } from './product-category/entities/product-category.entity';
import { TaskProductItemModule } from './task-product-item/task-product-item.module';

import Joi from 'joi';
import { TaskProductItem } from './task-product-item/entities/task-product-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(8000),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_DB: Joi.string().required(),
        SECRET_KEY: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        MAIL_ADMIN: Joi.string().required(),
      }),
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
        Product,
        ProductCategory,
        TaskProductItem,
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
    ProductModule,
    ProductCategoryModule,
    TaskProductItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
