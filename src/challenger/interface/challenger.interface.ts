import { Player } from 'src/players/interface/player.interface';
import { StatusChallenger } from '../enum/status-challenger.enum';

export interface Challenger extends Document {
  challengerTime: Date;
  status: StatusChallenger;
  solicitationTime: Date;
  answerTime: Date;
  solicitation: Player;
  category: string;
  players: Player[];
}

export interface Match extends Document {
  category: string;
  players: Player[];
  def: Player;
  result: Result[];
}

export interface Result {
  set: string;
}
