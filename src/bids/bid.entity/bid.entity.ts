import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { User } from '../../users/user.entity/user.entity';
import { Item } from '../../items/item.entity/item.entity';

@Entity()
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  bidAmount: number;

  @Column({ type: 'datetime' })
  bidTime: Date;

  @ManyToOne(() => User, (user) => user.bids)
  user: User;

  @ManyToOne(() => Item, (item) => item.bids)
  item: Item;
}
