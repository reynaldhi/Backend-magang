import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BannerDto } from './dto/banner.dto';
import { TypeContent } from '../typeContent/entity/typeContent.entity';
import { Content } from '../content/entity/content.entity';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(TypeContent)
    private typeContentRepository: Repository<TypeContent>,
  ) {}

  async create(createBannerDto: BannerDto) {
    try {
      const type = await this.typeContentRepository.findBy({
        id: createBannerDto.typeContent_id,
      });

      const dataContent = new Content();
      dataContent.title = createBannerDto.title;
      dataContent.contents = createBannerDto.contents;
      dataContent.img_url = createBannerDto.img_url;
      dataContent.status = createBannerDto.status;
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

  async update(id: string, updateBannerDto: BannerDto) {
    try {
      const content = await this.findOne(id);

      if (!content) {
        throw new Error('Banner not found');
      }

      if (updateBannerDto.title) {
        content.title = updateBannerDto.title;
      }
      if (updateBannerDto.contents) {
        content.contents = updateBannerDto.contents;
      }
      if (updateBannerDto.status) {
        content.status = updateBannerDto.status;
      }
      if (updateBannerDto.img_url) {
        content.img_url = updateBannerDto.img_url;
      }
      if (updateBannerDto.typeContent_id) {
        const newTypeContent = await this.typeContentRepository.findBy({
          id: updateBannerDto.typeContent_id,
        });
        content.typeContent = newTypeContent[0];
      }

      const updatedBanner = await this.contentRepository.save(content);
      return updatedBanner;
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
