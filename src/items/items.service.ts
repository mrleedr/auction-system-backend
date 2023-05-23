import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './items.dto';
import { Item } from './item.entity/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
    console.log(createItemDto);
    const item = new Item();
    item.name = createItemDto.name;
    item.startingPrice = createItemDto.startingPrice;
    item.timeWindow = createItemDto.timeWindow;
    item.itemState = 'DRAFT';
    item.bidState = null;
    item.user = user;

    return this.itemRepository.save(item);
  }

  async publishItem(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      return null;
    }
    if (item.itemState !== 'DRAFT') {
      throw new Error('Item is not in draft state');
    }
    item.itemState = 'PUBLISHED';
    item.bidState = 'ONGOING';
    return this.itemRepository.save(item);
  }

  async getCompletedItems(): Promise<Item[]> {
    return this.itemRepository.find({ where: { bidState: 'COMPLETED' } });
  }

  async getOngoingItems(): Promise<Item[]> {
    return this.itemRepository.find({ where: { bidState: 'ONGOING' } });
  }
}
