import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bid } from './bid.entity/bid.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/item.entity/item.entity';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Bid)
    private readonly bidRepository: Repository<Bid>,
  ) {}

  async placeBid(bid: Bid): Promise<Bid> {
    // Get the item associated with the bid
    const item = await this.itemRepository.findOne({
      where: { id: bid.item.id },
    });
    // Update the highestBid field in the Item entity
    item.highestBid = bid.bidAmount;

    // Save the updated item in the database
    await this.itemRepository.save(item);

    // Save the bid in the database
    const createdBid = await this.bidRepository.save(bid);

    return createdBid;
  }
}
