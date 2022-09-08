import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interface/player.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  async createOrUpdate(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const playerFind = this.players.find((item) => item.email === email);

    if (!playerFind) {
      return this.createPlayer(createPlayerDto);
    }

    return this.updatePlayer(playerFind, createPlayerDto);
  }

  async getAll(): Promise<Player[]> {
    return this.players;
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const findPlayer = this.players.find((item) => item.email === email);
    if (!findPlayer) {
      throw new NotFoundException(`Player not found`);
    }
    return findPlayer;
  }

  async deletePlayerByEmail(email: string): Promise<void> {
    const findPlayer = this.players.find((item) => item.email === email);
    if (!findPlayer) {
      throw new NotFoundException(`Player not found`);
    }

    this.players = this.players.filter(
      (item) => item.email !== findPlayer.email,
    );
  }

  private createPlayer(createPlayerDto: CreatePlayerDto): void {
    const { name, email, phone_number } = createPlayerDto;

    const player: Player = {
      _id: uuid(),
      name: name,
      email: email,
      phone_number: phone_number,
      ranking: `A`,
      ranking_position: 1,
      avatar_url: 'any_url',
    };

    this.logger.log(`createPlayerDto : ${JSON.stringify(player)}`);

    this.players.push(player);
  }

  private updatePlayer(playerFind: Player, playerDto: CreatePlayerDto): void {
    const { name } = playerDto;
    playerFind.name = name;
  }
}
