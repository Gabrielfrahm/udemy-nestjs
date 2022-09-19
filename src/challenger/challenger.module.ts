import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from 'src/players/players.module';
import { ChallengerController } from './challenger.controller';
import { ChallengerSchema } from './interface/challenger.schema';
import { ChallengerService } from './challenger.service';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Challenger', schema: ChallengerSchema },
    ]),
    PlayersModule,
    CategoriesModule,
  ],
  controllers: [ChallengerController],
  providers: [ChallengerService],
})
export class ChallengerModule {}
