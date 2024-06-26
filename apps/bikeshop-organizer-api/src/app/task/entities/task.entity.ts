import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskCategory } from '../../task-category/entities/task-category.entity';
import { TaskCategoryStatus } from '../../task-category-status/entities/task-category-status.entity';
import { Bike } from '../../bike/entities/bike.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToMany(() => Product)
  @JoinTable()
  products?: Product[];
  @ManyToOne(() => TaskCategory, (taskCategory) => taskCategory.tasks)
  taskCategory: TaskCategory;
  @ManyToOne(
    () => TaskCategoryStatus,
    (taskCategoryStatus) => taskCategoryStatus.tasks
  )
  taskCategoryStatus: TaskCategoryStatus;
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
