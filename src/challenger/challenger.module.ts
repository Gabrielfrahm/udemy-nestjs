import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from 'src/players/players.module';
import { ChallengerController } from './challenger.controller';
import { ChallengerSchema } from './interface/challenger.schema';
import { ChallengerService } from './challenger.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { matchSchema } from './interface/match.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Challenger', schema: ChallengerSchema },
      { name: 'Match', schema: matchSchema },
    ]),
    PlayersModule,
    CategoriesModule,
  ],
  controllers: [ChallengerController],
  providers: [ChallengerService],
})
export class ChallengerModule {}
