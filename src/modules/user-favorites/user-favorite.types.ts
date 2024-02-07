import { IsNotEmpty } from 'class-validator';

export class SaveFavoriteDto {
  @IsNotEmpty()
  readonly teamId: string;
}
