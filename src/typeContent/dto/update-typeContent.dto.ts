import { IsNotEmpty } from 'class-validator';

export class UpdateTypeContentDto {
  @IsNotEmpty()
  name: string;
}
