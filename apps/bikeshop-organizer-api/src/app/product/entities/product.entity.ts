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
import { Brand } from '../../brand/entities/brand.entity';
import { Shop } from '../../shop/entities/shop.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Brand, (brand) => brand.id)
  brand: Brand;

  @Column({ nullable: false })
  price: number;

  @ManyToOne(() => Shop, (shop) => shop.id)
  shop: Shop;

  @ManyToMany(() => Task)
  @JoinTable()
  tasks?: Task[];

  @Column({ nullable: true })
  productCategory?: string; // TODO: Create a product category entity

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
