import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entity/user';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async CreateUser(createUserDto: CreateUserDto) {
    const result = await this.usersRepository.insert(createUserDto);

    return this.usersRepository.findOneByOrFail(result.identifiers[0].id);
  }

  async getAll() {
    return this.usersRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.usersRepository.findOneByOrFail(id);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  async updateUser(id: string, updateUser: UpdateUserDto) {
    try {
      await this.usersRepository.findOneByOrFail(id);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }

      const result = await this.usersRepository.insert(updateUser);

      return this.usersRepository.findOneByOrFail(id);
    }
  }

  async DeleteUser() {
    console.log('Delete User');
  }
}
