import {
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Entity,
  Unique,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Item } from '../../items/item.entity/item.entity';
import { Bid } from '../../bids/bid.entity/bid.entity';
import { Transaction } from '../../transactions/transaction.entity/transaction.entity';
import { IsEmail } from 'class-validator';

@Entity()
@Unique(['email', 'username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column({ length: 200 })
  username: string;

  @Column()
  password?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balance?: number;

  @IsEmail()
  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions?: Transaction[];

  @OneToMany(() => Item, (item) => item.user)
  items?: Item[];

  @OneToMany(() => Bid, (bid) => bid.user)
  bids?: Bid[];
}
