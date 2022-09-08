import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interface/player.interface';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {
    this.playerService = playerService;
  }

  @Post()
  async createOrUpdate(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<void> {
    await this.playerService.createOrUpdate(createPlayerDto);
  }

  @Get()
  async getAll(@Query('email') email: string): Promise<Player[] | Player> {
    if (!email) {
      return this.playerService.getAll();
    }
    return this.playerService.getPlayerByEmail(email);
  }

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    this.playerService.deletePlayerByEmail(email);
  }
}
