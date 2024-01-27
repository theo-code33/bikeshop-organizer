import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Common } from '../../common/entities/common.entity';

@Entity()
export class Bike extends Common {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  brand: string; // TODO: connect to Brand entity
  @Column({ nullable: false })
  model: string;
  @Column({ nullable: true })
  bicycode?: string;
  @Column({ nullable: false })
  color: string;
  @ManyToOne(() => Client, (client) => client.id)
  client: Client;
  @Column({ nullable: true })
  tasks?: string; // TODO: connect to Task entity
}
