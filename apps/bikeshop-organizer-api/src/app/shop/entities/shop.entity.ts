import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string;
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
  taskCategories?: string;
  @Column({ nullable: true })
  clients?: string;
  @Column({ nullable: true })
  products?: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}