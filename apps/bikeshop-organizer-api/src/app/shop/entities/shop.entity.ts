import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Client } from '../../client/entities/client.entity';
import { Brand } from '../../brand/entities/brand.entity';
import { TaskCategory } from '../../task-category/entities/task-category.entity';
import { Status } from '../../status/entities/status.entity';
import { Product } from '../../product/entities/product.entity';
import { ProductCategory } from '../../product-category/entities/product-category.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => User, (user) => user.shop)
  @JoinColumn()
  user: User;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  siret: string;
  @Column({ nullable: false })
  address: string;
  @Column({ nullable: false })
  postalCode: string;
  @Column({ nullable: false })
  city: string;
  @Column({ nullable: false })
  email: string;
  @Column({ nullable: false })
  phoneNumber: string;
  @OneToMany(() => TaskCategory, (taskCategory) => taskCategory.shop)
  taskCategories?: TaskCategory[];
  @OneToMany(() => Client, (client) => client.shop)
  clients?: Client[];
  @OneToMany(() => Product, (product) => product.shop)
  products?: Product[];
  @OneToMany(() => Brand, (brand) => brand.shop)
  brands?: Brand[];
  @OneToMany(() => Status, (status) => status.shop)
  status?: Status[];
  @OneToMany(() => ProductCategory, (productCategory) => productCategory.shop)
  categories?: ProductCategory[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
