import { IsNotEmpty, IsOptional } from 'class-validator';

export class BannerDto {
  @IsOptional()
  title: string;

  @IsOptional()
  contents: string;

  @IsOptional()
  img_url: string[];

  @IsOptional()
  status: boolean;

  @IsNotEmpty()
  typeContent_id: string;
}
