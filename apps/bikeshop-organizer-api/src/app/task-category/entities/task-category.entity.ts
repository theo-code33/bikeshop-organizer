import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { Common } from '../../common/entities/common.entity';
import { TaskCategoryStatus } from '../../task-category-status/entities/task-category-status.entity';

@Entity()
export class TaskCategory extends Common {
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
  @Column({ nullable: true })
  tasks?: string; // TODO: create a Task entity
}
