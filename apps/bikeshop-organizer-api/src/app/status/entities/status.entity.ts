import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Common } from '../../common/entities/common.entity';
import { TaskCategoryStatus } from '../../task-category-status/entities/task-category-status.entity';
import { Shop } from '../../shop/entities/shop.entity';

@Entity()
export class Status extends Common {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    nullable: false,
  })
  name: string;
  @Column({
    nullable: true,
  })
  description?: string;
  @Column({
    nullable: false,
  })
  color: string;
  @ManyToOne(() => Shop, (shop) => shop.status)
  shop: Shop;
  @OneToMany(
    () => TaskCategoryStatus,
    (taskCategoryStatus) => taskCategoryStatus.status
  )
  taskCategoryStatus?: TaskCategoryStatus[];
}
