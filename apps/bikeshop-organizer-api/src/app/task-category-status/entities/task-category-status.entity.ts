import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskCategory } from '../../task-category/entities/task-category.entity';
import { Common } from '../../common/entities/common.entity';

@Entity()
export class TaskCategoryStatus extends Common {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  status: string; // TODO: create a Status entity
  @Column({ nullable: false })
  order: number;
  @ManyToOne(
    () => TaskCategory,
    (taskCategory) => taskCategory.taskCategoryStatus
  )
  taskCategory: TaskCategory;
  @Column({ nullable: true })
  tasks?: string; // TODO: create a Task entity
}
