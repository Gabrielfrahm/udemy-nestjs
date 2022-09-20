import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { StatusChallenger } from '../enum/status-challenger.enum';

export class UpdateChallengerDto {
  @IsNotEmpty()
  @IsDateString()
  challengerTime: Date;

  @IsNotEmpty()
  @IsEnum(StatusChallenger)
  status: StatusChallenger;
}
