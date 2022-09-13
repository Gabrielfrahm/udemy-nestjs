import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './interface/player.interface';
import { ParamsValidationPlayersPipe } from './pipes/params-validation-players.pipe';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {
    this.playerService = playerService;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return await this.playerService.create(createPlayerDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('id', ParamsValidationPlayersPipe) _id: string,
  ): Promise<void> {
    await this.playerService.update(_id, updatePlayerDto);
  }

  @Get()
  async getAll(): Promise<Player[]> {
    return this.playerService.getAll();
  }

  @Get('/:id')
  async getById(
    @Param('id', ParamsValidationPlayersPipe) _id: string,
  ): Promise<Player> {
    return this.playerService.getPlayerById(_id);
  }

  @Delete('/:id')
  async deletePlayer(
    @Param('id', ParamsValidationPlayersPipe) _id: string,
  ): Promise<void> {
    this.playerService.deletePlayerById(_id);
  }
}
