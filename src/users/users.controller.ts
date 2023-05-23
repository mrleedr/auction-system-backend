import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    const { user } = req.user.payload;
    const profile = this.usersService.profile(user.id);

    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  async deposit(@Body('amount') amount: number, @Req() req) {
    const { user } = req.user.payload;

    await this.usersService.deposit(user.id, amount);

    return { message: 'Amount deposited successfully' };
  }
}
