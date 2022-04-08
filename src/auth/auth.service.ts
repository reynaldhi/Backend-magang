import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  Login() {
    return { message: 'Testing Login Aja' };
  }

  Register() {
    return { message: 'Register Testing' };
  }
}
