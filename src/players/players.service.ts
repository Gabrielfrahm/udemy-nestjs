import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interface/player.interface';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  // private readonly logger = new Logger(PlayersService.name);

  async createOrUpdate(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;

    const playerFind = await this.playerModel.findOne({ email }).exec();

    if (!playerFind) {
      return this.createPlayer(createPlayerDto);
    }

    return this.updatePlayer(createPlayerDto);
  }

  async getAll(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const findPlayer = await this.playerModel.findOne({ email }).exec();
    if (!findPlayer) {
      throw new NotFoundException(`Player not found`);
    }
    return findPlayer;
  }

  async deletePlayerByEmail(email: string): Promise<void> {
    return await this.playerModel.remove({ email }).exec();
  }

  private async createPlayer(
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    const createPlayer = new this.playerModel(createPlayerDto);
    return await createPlayer.save();
  }

  private async updatePlayer(playerDto: CreatePlayerDto): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate({ email: playerDto.email }, { $set: playerDto })
      .exec();
  }
}
