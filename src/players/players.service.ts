import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interface/player.interface';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;
    const playerFind = await this.playerModel.findOne({ email }).exec();
    if (playerFind) {
      throw new BadRequestException('Email already existis');
    }
    return this.createPlayer(createPlayerDto);
  }

  async update(_id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const playerFind = await this.playerModel.findOne({ _id }).exec();

    if (!playerFind) {
      throw new NotFoundException('Player not found');
    }

    return this.updatePlayer(_id, updatePlayerDto);
  }

  async getAll(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getPlayerById(_id: string): Promise<Player> {
    const findPlayer = await this.playerModel.findOne({ _id }).exec();
    if (!findPlayer) {
      throw new NotFoundException(`Player not found`);
    }
    return findPlayer;
  }

  async deletePlayerById(_id: string): Promise<any> {
    const findPlayer = await this.playerModel.findOne({ _id }).exec();
    if (!findPlayer) {
      throw new NotFoundException(`Player not found`);
    }
    return await this.playerModel.findOneAndDelete({ _id }).exec();
  }

  private async createPlayer(
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    const createPlayer = new this.playerModel(createPlayerDto);
    return await createPlayer.save();
  }

  private async updatePlayer(
    _id: string,
    playerDto: UpdatePlayerDto,
  ): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate({ _id }, { $set: playerDto })
      .exec();
  }
}
