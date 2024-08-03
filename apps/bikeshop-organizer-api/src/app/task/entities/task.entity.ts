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
import { TaskCategory } from '../../task-category/entities/task-category.entity';
import { TaskCategoryStatus } from '../../task-category-status/entities/task-category-status.entity';
import { Bike } from '../../bike/entities/bike.entity';
import { Client } from '../../client/entities/client.entity';
import { TaskProductItem } from '../../task-product-item/entities/task-product-item.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => TaskProductItem, (taskProductItem) => taskProductItem.task)
  products?: TaskProductItem[];
  @ManyToOne(() => TaskCategory, (taskCategory) => taskCategory.tasks)
  taskCategory: TaskCategory;
  @ManyToOne(
    () => TaskCategoryStatus,
    (taskCategoryStatus) => taskCategoryStatus.tasks
  )
  taskCategoryStatus: TaskCategoryStatus;
  @ManyToOne(() => Client, (client) => client.tasks)
  client: Client;
  @ManyToOne(() => Bike, (bike) => bike.tasks)
  bike: Bike;
  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  startDate: string;
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  endDate: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
