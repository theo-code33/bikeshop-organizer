import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Common } from '../../common/entities/common.entity';
import { TaskCategory } from '../../task-category/entities/task-category.entity';
import { TaskCategoryStatus } from '../../task-category-status/entities/task-category-status.entity';
import { Bike } from '../../bike/entities/bike.entity';

@Entity()
export class Task extends Common {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  products?: string; // TODO: Create a Product entity
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
}
