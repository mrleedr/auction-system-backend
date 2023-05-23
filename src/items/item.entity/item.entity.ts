import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/user.entity/user.entity';
import { Bid } from '../../bids/bid.entity/bid.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'float' })
  startingPrice: number;

  @Column()
  itemState: 'DRAFT' | 'PUBLISHED';

  @Column({ default: null, nullable: true })
  bidState?: 'ONGOING' | 'COMPLETED' | null;

  @Column({ type: 'int' })
  timeWindow: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @OneToMany(() => Bid, (bid) => bid.item)
  bids: Bid[];
}
