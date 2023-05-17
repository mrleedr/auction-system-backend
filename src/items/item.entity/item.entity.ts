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
  state: string;

  @Column({ type: 'datetime' })
  timeWindow: Date;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @OneToMany(() => Bid, (bid) => bid.item)
  bids: Bid[];
}
