import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskCategoryStatus } from '../../task-category-status/entities/task-category-status.entity';
import { Shop } from '../../shop/entities/shop.entity';

@Entity()
export class Status {
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
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
