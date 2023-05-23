import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import Redis from 'ioredis';
import { BidsService } from './bids.service';
import { ItemsService } from 'src/items/items.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Bid } from './bid.entity/bid.entity';

@Controller('bids')
export class BidsController {
  private redisClient: Redis;

  constructor(
    private readonly itemsService: ItemsService,
    private readonly bidsService: BidsService,
  ) {
    // Create a new Redis client and set the server address
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/bid')
  async placeBid(
    @Param('id') id: number,
    @Body() bidData: { bidAmount: number },
    @Req() req,
  ): Promise<Bid> {
    const { user } = req.user.payload;
    const item = await this.itemsService.getItemById(id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.BAD_REQUEST);
    }

    // Check if the item is published
    if (item.itemState !== 'PUBLISHED') {
      throw new HttpException('Item is not published', HttpStatus.BAD_REQUEST);
    }

    // Check if the bid is higher than the current highest bid and starting price
    if (
      bidData.bidAmount <= item.startingPrice ||
      bidData.bidAmount <= item.highestBid
    ) {
      throw new HttpException(
        'Bid price must be higher than the current highest bid and starting price',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Check if the bid interval has passed (5 seconds)
    const currentTime = Date.now();
    const lastBidTime = await this.redisClient.get(`item:${id}:lastBidTime`);
    if (lastBidTime && currentTime - Number(lastBidTime) < 5000) {
      throw new HttpException(
        'Please wait 5 seconds before placing another bid on this item',
        HttpStatus.BAD_REQUEST,
      );
    }

    const bid = {
      bidAmount: bidData.bidAmount,
      item: item,
      user: user,
    };

    const placedBid = await this.bidsService.placeBid(bid);

    await this.redisClient.set(`item:${id}:highestBid`, bidData.bidAmount);
    await this.redisClient.set(`item:${id}:lastBidTime`, String(currentTime));

    return placedBid;
  }
}
