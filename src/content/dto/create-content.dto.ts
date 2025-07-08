import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  contents: string;

  @IsNotEmpty()
  img_url: string[];

  @IsNotEmpty()
  deadline: Date;

  @IsNotEmpty()
  status: boolean;

  @IsNotEmpty()
  typeContent_id: string;

  @IsNotEmpty()
  company_id: string;
}
