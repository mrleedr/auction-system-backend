import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Item } from '../../items/item.entity/item.entity';
import { Bid } from '../../bids/bid.entity/bid.entity';
import { Transaction } from '../../transactions/transaction.entity/transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balance: number;

  @Column()
  email: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];

  @OneToMany(() => Bid, (bid) => bid.user)
  bids: Bid[];
}
