import { Module } from '@nestjs/common';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './bid.entity/bid.entity';
import { ItemsService } from 'src/items/items.service';
import { Item } from 'src/items/item.entity/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Bid])],
  controllers: [BidsController],
  providers: [ItemsService, BidsService],
})
export class BidsModule {}
