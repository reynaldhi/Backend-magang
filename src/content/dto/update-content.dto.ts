import { IsNotEmpty } from 'class-validator';

export class UpdateContentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  contents: string;

  @IsNotEmpty()
  img_url: string;

  @IsNotEmpty()
  typeContent_id: string;
}
