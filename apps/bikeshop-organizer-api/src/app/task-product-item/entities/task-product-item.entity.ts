import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class TaskProductItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, default: 0, type: 'int' })
  quantity: number;
  @ManyToOne(() => Product, (product) => product.taskProductItem)
  product: Product;
  @ManyToOne(() => Task, (task) => task.products, {
    cascade: true,
  })
  task: Task;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
