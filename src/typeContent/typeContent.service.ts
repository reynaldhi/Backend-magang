import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Brackets, EntityNotFoundError, Repository } from 'typeorm';
import { TypeContent } from './entity/typeContent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTypeContentDto } from './dto/create-typeContent.dto';
import { UpdateTypeContentDto } from './dto/update-typeContent.dto';

@Injectable()
export class TypeContentService {
  constructor(
    @InjectRepository(TypeContent)
    private typeContentRepository: Repository<TypeContent>,
  ) {}

  async create(createTypeContentDto: CreateTypeContentDto) {
    try {
      return this.typeContentRepository.save(createTypeContentDto);
    } catch (e) {
      console.error('Error create type content:', e);
      throw new Error('Failed to create type content');
    }
  }

  async findAll(search) {
    const dataTypeContent =
      this.typeContentRepository.createQueryBuilder('typeContent');
    if (search) {
      dataTypeContent.andWhere(
        new Brackets((qb) => {
          qb.where('typeContent.name ilike :search', {
            search: `%${search}%`,
          });
        }),
      );
    }

    const data = await dataTypeContent.getMany();
    const count = await dataTypeContent.getCount();

    return {
      data: data,
      count: count,
    };
  }

  async findOne(id: string) {
    return this.typeContentRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTypeContentDto: UpdateTypeContentDto) {
    try {
      await this.typeContentRepository.findOneOrFail({ where: { id } });
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

    await this.typeContentRepository.update(id, updateTypeContentDto);

    return this.typeContentRepository.findOneOrFail({ where: { id } });
  }

  async delete(id: string) {
    try {
      await this.typeContentRepository.findOneOrFail({ where: { id } });

      await this.typeContentRepository.update(id, {
        deletedAt: new Date(),
      });
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
}
