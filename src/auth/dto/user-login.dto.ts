import {IsNotEmpty, IsString} from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
