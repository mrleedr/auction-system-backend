import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './items.dto';
import { Item } from './item.entity/item.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createItem(
    @Body() createItemDto: CreateItemDto,
    @Req() req,
  ): Promise<Item> {
    const { user } = req.user.payload;
    return this.itemsService.createItem(createItemDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/publish')
  async publishItem(@Param('id') id: number): Promise<Item> {
    const item = await this.itemsService.publishItem(id);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  @Get('completed')
  async getCompletedItems(): Promise<Item[]> {
    return this.itemsService.getCompletedItems();
  }

  @Get('ongoing')
  async getOngoingItems(): Promise<Item[]> {
    return this.itemsService.getOngoingItems();
  }
}
