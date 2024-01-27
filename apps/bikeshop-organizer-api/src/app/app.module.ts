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
      entities: [User, Shop, Client, Bike],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    MailModule,
    ShopModule,
    ClientModule,
    BikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
