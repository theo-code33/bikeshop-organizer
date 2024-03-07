import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Common } from '../../common/entities/common.entity';
import { Client } from '../../client/entities/client.entity';
import { Brand } from '../../brand/entities/brand.entity';
import { TaskCategory } from '../../task-category/entities/task-category.entity';
import { Status } from '../../status/entities/status.entity';

@Entity()
export class Shop extends Common {
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
  @Column({ nullable: true })
  products?: string; // TODO: create a Product entity
  @OneToMany(() => Brand, (brand) => brand.shop)
  brands?: Brand[];
  @OneToMany(() => Status, (status) => status.shop)
  status?: Status[];
}
