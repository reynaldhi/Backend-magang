import {
  Controller,
  Post,
  Get,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async Login() {
    const data = await this.authService.Login();
    return {
      data: data,
      statusCode: HttpStatus.OK,
      message: 'success login',
    };
  }

  @Post('register')
  async Register() {
    const data = await this.authService.Register();
    return {
      data: data,
      statusCode: HttpStatus.OK,
      message: 'success to register',
    };
  }
}
