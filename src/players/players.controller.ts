import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';

@Controller('players')
export class PlayersController {
  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    const { name } = createPlayerDto;
    return name;
  }
}
