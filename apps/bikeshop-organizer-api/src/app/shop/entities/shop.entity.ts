import { Column, Entity, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Common } from '../../common/entities/common.entity';

@Entity()
export class Shop extends Common {
  @OneToOne(() => User, (user) => user.shop)
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
  @Column({ nullable: true })
  taskCategories?: string; // TODO: create a TaskCategory entity
  @Column({ nullable: true })
  clients?: string; // TODO: create a Client entity
  @Column({ nullable: true })
  products?: string; // TODO: create a Product entity
}
