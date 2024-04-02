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
import { Client } from '../../client/entities/client.entity';
import { Brand } from '../../brand/entities/brand.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class Bike {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Brand, (brand) => brand.id)
  brand: Brand;
  @Column({ nullable: false })
  model: string;
  @Column({ nullable: true })
  bicycode?: string;
  @Column({ nullable: false })
  color: string;
  @ManyToOne(() => Client, (client) => client.id)
  client: Client;
  @OneToMany(() => Task, (task) => task.bike)
  tasks?: Task[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
