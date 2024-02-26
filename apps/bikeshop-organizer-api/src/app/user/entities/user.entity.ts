import { Roles } from '@bikeshop-organizer/types';
import { Column, Entity, OneToOne } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { Common } from '../../common/entities/common.entity';

@Entity()
export class User extends Common {
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
}
