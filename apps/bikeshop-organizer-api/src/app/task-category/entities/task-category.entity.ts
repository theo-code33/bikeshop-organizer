import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { Common } from '../../common/entities/common.entity';

@Entity()
export class TaskCategory extends Common {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ nullable: false })
  name: string;
  @ManyToOne(() => Shop, (shop) => shop.taskCategories)
  shop: Shop;
  @Column({ nullable: true })
  taskCategoryStatus?: string; // TODO: create a TaskCategoryStatus entity
  @Column({ nullable: true })
  tasks?: string; // TODO: create a Task entity
}
