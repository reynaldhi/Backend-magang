import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Content } from './entity/content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { TypeContent } from '../typeContent/entity/typeContent.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(TypeContent)
    private typeContentRepository: Repository<TypeContent>,
  ) {}

  async create(createContentDto: CreateContentDto) {
    try {
      const type = await this.typeContentRepository.findBy({
        id: createContentDto.typeContent_id,
      });

      const dataContent = new Content();
      dataContent.title = createContentDto.title;
      dataContent.contents = createContentDto.contents;
      dataContent.img_url = createContentDto.img_url;
      dataContent.typeContent = type[0];

      return this.contentRepository.save(dataContent);
    } catch (e) {
      console.error('Error create content:', e);
      throw new Error('Failed to create content');
    }
  }

  async findAll(params) {
    const dataContent = this.contentRepository
      .createQueryBuilder('content')
      .leftJoinAndSelect('content.typeContent', 'typeContent');
    if (params) {
      dataContent.andWhere('content.typeContent_id = typeContent_id', {
        params,
      });
    }

    const data = await dataContent.getMany();
    const count = await dataContent.getCount();

    return {
      data: data,
      count: count,
    };
  }

  async findOne(id: string) {
    try {
      const content = this.contentRepository
        .createQueryBuilder('content')
        .leftJoinAndSelect('content.typeContent', 'typeContent')
        .where('content.id = :id', { id })
        .getOne();

      return content;
    } catch (e) {
      console.error(e, 'failed');
      throw new Error('Failed to retreive content');
    }
  }

  async update(id: string, updateContentDto: UpdateContentDto) {
    try {
      const content = await this.findOne(id);

      if (!content) {
        throw new Error('Content not found');
      }

      if (updateContentDto.title) {
        content.title = updateContentDto.title;
      }
      if (updateContentDto.contents) {
        content.contents = updateContentDto.contents;
      }
      if (updateContentDto.img_url) {
        content.img_url = updateContentDto.img_url;
      }
      if (updateContentDto.typeContent_id) {
        const newTypeContent = await this.typeContentRepository.findBy({
          id: updateContentDto.typeContent_id,
        });
        content.typeContent = newTypeContent[0];
      }

      const updatedContent = await this.contentRepository.save(content);
      return updatedContent;
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

  async delete(id: string) {
    try {
      await this.contentRepository.findOneOrFail({ where: { id } });

      await this.contentRepository.update(id, {
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
