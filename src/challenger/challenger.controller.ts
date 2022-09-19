import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengerService } from './challenger.service';
import { CreateChallengerDto } from './dtos/create-challenger.dto';
import { Challenger } from './interface/challenger.interface';

@Controller('challenger')
export class ChallengerController {
  constructor(private readonly challengerService: ChallengerService) {
    this.challengerService = challengerService;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenger(
    @Body() createChallengerDto: CreateChallengerDto,
  ): Promise<Challenger> {
    return await this.challengerService.createChallenger(createChallengerDto);
  }
}
