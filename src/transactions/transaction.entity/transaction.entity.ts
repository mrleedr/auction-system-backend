import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { User } from '../../users/user.entity/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'datetime' })
  transactionTime: Date;

  @Column()
  type: 'DEPOSIT' | 'BID';

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
