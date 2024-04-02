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
import { Shop } from '../../shop/entities/shop.entity';
import { TaskCategoryStatus } from '../../task-category-status/entities/task-category-status.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class TaskCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  name: string;
  @ManyToOne(() => Shop, (shop) => shop.taskCategories)
  shop: Shop;
  @OneToMany(
    () => TaskCategoryStatus,
    (taskCategoryStatus) => taskCategoryStatus.taskCategory
  )
  taskCategoryStatus?: TaskCategoryStatus[];
  @OneToMany(() => Task, (task) => task.taskCategory)
  tasks?: Task[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
