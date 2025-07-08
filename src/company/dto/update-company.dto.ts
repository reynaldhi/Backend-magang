import { IsNotEmpty } from 'class-validator';

export class UpdateCompanyDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  logo: string;
}
