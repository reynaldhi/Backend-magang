import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async CreateUser() {
    console.log('Haiiii');
  }

  async getAll() {
    console.log('Get All User');
  }

  async updateUser(updateUser: UpdateUserDto) {
    console.log('Update User');
  }

  async DeleteUser() {
    console.log('Delete User');
  }
}
