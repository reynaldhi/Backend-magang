import {forwardRef, Inject, Injectable } from '@nestjs/common';
import {UserLoginDto} from "./dto/user-login.dto";
import {UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
      @Inject(
          forwardRef(() => {
            return UserService;
          }),
      )
      private UserService: UserService,
  ) {}

    // async login(loginUserDto: LoginUserDto) {
    //     const { user, menus, isUserTeam, userTeam } = await this.usersService.findOneByUsernameOrEmail(
    //         loginUserDto.usernameOrEmail,
    //     );
    //
    //     return response;
    // }

  async Register() {
    return { message: 'Register Testing' };
  }
}
