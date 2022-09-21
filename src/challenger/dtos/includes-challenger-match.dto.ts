import { IsNotEmpty } from 'class-validator';
import { Player } from 'src/players/interface/player.interface';
import { Result } from '../interface/challenger.interface';

export class IncludesChallengerMatchDto {
  @IsNotEmpty()
  def: Player;

  result: Result[];
}
