import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Player } from 'src/players/interface/player.interface';

export class CreateChallengerDto {
  @IsNotEmpty()
  @IsDateString()
  challengerTime: Date;

  @IsNotEmpty()
  solicitation: Player;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Player[];
}
