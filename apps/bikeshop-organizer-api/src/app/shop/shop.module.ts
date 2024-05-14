import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { UserModule } from '../user/user.module';
import { StatusModule } from '../status/status.module';
import { TaskCategoryModule } from '../task-category/task-category.module';
import { TaskCategoryStatusModule } from '../task-category-status/task-category-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shop]),
    UserModule,
    StatusModule,
    TaskCategoryModule,
    TaskCategoryStatusModule,
  ],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
