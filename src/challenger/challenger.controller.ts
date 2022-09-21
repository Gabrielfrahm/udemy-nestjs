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
import { ChallengerService } from './challenger.service';
import { CreateChallengerDto } from './dtos/create-challenger.dto';
import { IncludesChallengerMatchDto } from './dtos/includes-challenger-match.dto';
import { UpdateChallengerDto } from './dtos/update-challenger.dto';
import { Challenger } from './interface/challenger.interface';
import { StatusChallengerValidation } from './pipes/status-challenger-validation.pipe';

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

  @Get()
  async getAll(@Query('playerId') _id: string): Promise<Challenger[]> {
    return _id
      ? await this.challengerService.getPlayerChallengers(_id)
      : await this.challengerService.getAll();
  }

  @Put(':challengerId')
  async updateChallenger(
    @Body(StatusChallengerValidation) updateChallengerDto: UpdateChallengerDto,
    @Param('challengerId') _id: string,
  ): Promise<void> {
    console.log(updateChallengerDto);
    await this.challengerService.updateChallenger(_id, updateChallengerDto);
  }

  @Post(':challengerId/match/')
  async includesChallengerMatch(
    @Body(ValidationPipe)
    includesChallengerMatchDto: IncludesChallengerMatchDto,
    @Param('challengerId') _id: string,
  ): Promise<void> {
    return this.challengerService.includesChallengerMatch(
      _id,
      includesChallengerMatchDto,
    );
  }

  @Delete(':_id')
  async deleteChallenger(@Param('_id') _id: string): Promise<void> {
    await this.challengerService.deleteChallenger(_id);
  }
}
