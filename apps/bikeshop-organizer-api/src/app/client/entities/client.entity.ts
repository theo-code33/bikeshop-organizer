import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { Bike } from '../../bike/entities/bike.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  firstName: string;
  @Column({ nullable: false })
  lastName: string;
  @Column({ nullable: false })
  phoneNumber: string;
  @Column({ nullable: false })
  email: string;
  @ManyToOne(() => Shop, (shop) => shop.id)
  shop: Shop;
  @Column({ nullable: false })
  address: string;
  @Column({ nullable: false })
  postalCode: string;
  @Column({ nullable: false })
  city: string;
  @OneToMany(() => Bike, (bike) => bike.client)
  bikes?: Bike[];
  @OneToMany(() => Task, (task) => task.client)
  tasks?: Task[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
