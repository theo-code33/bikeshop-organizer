import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { Common } from '../../common/entities/common.entity';
import { TaskCategoryStatus } from '../../task-category-status/entities/task-category-status.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class TaskCategory extends Common {
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
}
