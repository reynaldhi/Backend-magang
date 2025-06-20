import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeContentDto {
  @ApiProperty({ example: 'Sertifikat', description: 'Nama untuk Tipe Konten' })
  @IsNotEmpty()
  name: string;
}
