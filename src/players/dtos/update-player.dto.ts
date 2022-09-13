import { IsNotEmpty } from 'class-validator';

export class UpdatePlayerDto {
  @IsNotEmpty()
  readonly phone_number: string;

  @IsNotEmpty()
  readonly name: string;
}
