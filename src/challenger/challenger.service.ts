import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/interface/category';
import { Player } from 'src/players/interface/player.interface';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengerDto } from './dtos/create-challenger.dto';
import { UpdateChallengerDto } from './dtos/update-challenger.dto';
import { StatusChallenger } from './enum/status-challenger.enum';
import { Challenger } from './interface/challenger.interface';

@Injectable()
export class ChallengerService {
  constructor(
    @InjectModel('Challenger')
    private readonly challengerModel: Model<Challenger>,
    private readonly playerService: PlayersService,
    private readonly categoryService: CategoriesService,
  ) {
    this.playerService = playerService;
    this.categoryService = categoryService;
  }

  async createChallenger(
    createChallengerDto: CreateChallengerDto,
  ): Promise<Challenger> {
    const { players, solicitation } = createChallengerDto;
    for (const player of players) {
      const findPlayer = await this.playerService.getPlayerById(player._id);
      if (!findPlayer) {
        throw new BadRequestException('Player not found');
      }
    }
    const verifyPlayerInMatch = players.filter(
      (item) => item._id === solicitation._id,
    );
    if (verifyPlayerInMatch.length === 0) {
      throw new BadRequestException('Player not be in the match');
    }
    const categoryPlayer = await this.categoryService.getCategoryPlayerById(
      solicitation._id,
    );

    if (!categoryPlayer) {
      throw new BadRequestException('Player not in category');
    }

    const challenger = new this.challengerModel(createChallengerDto);
    challenger.category = categoryPlayer.category;
    challenger.challengerTime = new Date();

    challenger.status = StatusChallenger.PENDENTE;
    return await challenger.save();
  }

  async getAll(): Promise<Challenger[]> {
    return this.challengerModel
      .find()
      .populate('solicitation')
      .populate('players')
      .populate('match')
      .exec();
  }

  async getPlayerChallengers(_id: any): Promise<Challenger[]> {
    const findChallengers = await this.getAll();

    if (!findChallengers) {
      throw new NotFoundException('this player not have challengers');
    }

    return this.challengerModel
      .find()
      .where('players')
      .in(_id)
      .populate('solicitation')
      .populate('players')
      .populate('match')
      .exec();
  }

  async updateChallenger(
    _id: string,
    updateChallengerDto: UpdateChallengerDto,
  ): Promise<void> {
    const findChallenger = await this.challengerModel.findById(_id).exec();
    if (!findChallenger) {
      throw new NotFoundException('Challenger not found');
    }
    if (updateChallengerDto.status) {
      findChallenger.answerTime = new Date();
    }
    findChallenger.status = updateChallengerDto.status;
    findChallenger.challengerTime = updateChallengerDto.challengerTime;
    await this.challengerModel
      .findOneAndUpdate({ _id }, { $set: findChallenger })
      .exec();
  }
}
