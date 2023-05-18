import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Entity,
} from 'typeorm';
import { User } from '../../users/user.entity/user.entity';
import { Bid } from '../../bids/bid.entity/bid.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  startingPrice: number;

  @Column()
  state: 'DRAFT' | 'PUBLISHED';

  @Column({ type: 'datetime' })
  timeWindow: Date;

  @Column({ default: null, type: 'datetime' })
  created_at?: Date;

  @Column({ default: null, type: 'datetime' })
  updated_at?: Date;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @OneToMany(() => Bid, (bid) => bid.item)
  bids: Bid[];
}
