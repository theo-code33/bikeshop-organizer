import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { TaskCategory } from '../../task-category/entities/task-category.entity';
import { Common } from '../../common/entities/common.entity';
import { Status } from '../../status/entities/status.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class TaskCategoryStatus extends Common {
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
}
