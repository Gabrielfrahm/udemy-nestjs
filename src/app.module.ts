import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';
import { ChallengerModule } from './challenger/challenger.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/smartranking'),
    PlayersModule,
    CategoriesModule,
    ChallengerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
