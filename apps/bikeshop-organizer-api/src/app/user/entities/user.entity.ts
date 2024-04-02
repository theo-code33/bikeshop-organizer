import { Roles } from '@bikeshop-organizer/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ nullable: false, select: false })
  password?: string;
  @Column({ nullable: false, type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;
  @Column({ nullable: true })
  resetPasswordToken?: string;
  @Column({ nullable: true })
  resetPasswordExpires?: Date;
  @OneToOne(() => Shop, (shop) => shop.user)
  shop?: Shop;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
