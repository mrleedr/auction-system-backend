import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty({ message: 'Name field cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Starting Price field cannot be empty' })
  startingPrice: number;

  @IsNotEmpty({ message: 'Time Window field cannot be empty' })
  timeWindow: number;
}
