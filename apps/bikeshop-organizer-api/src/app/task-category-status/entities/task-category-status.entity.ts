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
import { Status } from '../../status/entities/status.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class TaskCategoryStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Status, (status) => status.taskCategoryStatus)
  status: Status;
  @Column({ nullable: false })
  order: number;
  @ManyToOne(
    () => TaskCategory,
    (taskCategory) => taskCategory.taskCategoryStatus
  )
  taskCategory: TaskCategory;
  @OneToMany(() => Task, (task) => task.taskCategoryStatus)
  tasks?: Task[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
