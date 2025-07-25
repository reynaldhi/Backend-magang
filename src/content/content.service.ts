import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Content } from './entity/content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { TypeContent } from '../typeContent/entity/typeContent.entity';
import { Company } from '../company/entity/company.entity';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(TypeContent)
    private typeContentRepository: Repository<TypeContent>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createContentDto: CreateContentDto) {
    try {
      const type = await this.typeContentRepository.findBy({
        id: createContentDto.typeContent_id,
      });

      const company = await this.companyRepository.findBy({
        id: createContentDto.company_id,
      });

      const dataContent = new Content();
      dataContent.title = createContentDto.title;
      dataContent.contents = createContentDto.contents;
      dataContent.img_url = createContentDto.img_url;
      dataContent.status = createContentDto.status;
      dataContent.deadline = createContentDto.deadline;
      dataContent.typeContent = type[0];
      dataContent.company = company[0];

      return this.contentRepository.save(dataContent);
    } catch (e) {
      console.error('Error create content:', e);
      throw new Error('Failed to create content');
    }
  }

  async findAll(params) {
    await this.updateExpiredContent();

    const dataContent = this.contentRepository
      .createQueryBuilder('content')
      .leftJoinAndSelect('content.typeContent', 'typeContent')
      .leftJoinAndSelect('content.company', 'company');
    if (params) {
      if (params.typeContent_id) {
        dataContent.andWhere('content.typeContent.id = :typeContentId', {
          typeContentId: params.typeContent_id,
        });
      }

      if (params.company_id) {
        dataContent.andWhere('content.company.id = :companyId', {
          companyId: params.company_id,
        });
      }
    }

    const data = await dataContent.getMany();
    const count = await dataContent.getCount();

    return {
      data: data,
      count: count,
    };
  }

  private async updateExpiredContent(): Promise<void> {
    const currentDate = new Date();

    await this.contentRepository
      .createQueryBuilder()
      .update(Content)
      .set({
        status: false,
        updatedAt: currentDate,
      })
      .where('deadline IS NOT NULL')
      .andWhere('deadline < :currentDate', { currentDate })
      .andWhere('status != :inactiveStatus', { inactiveStatus: false })
      .execute();
  }

  async findOne(id: string) {
    try {
      const content = this.contentRepository
        .createQueryBuilder('content')
        .leftJoinAndSelect('content.typeContent', 'typeContent')
        .leftJoinAndSelect('content.company', 'company')
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
      if (updateContentDto.status) {
        content.status = updateContentDto.status;
      }
      if (updateContentDto.deadline) {
        content.deadline = updateContentDto.deadline;
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
      if (updateContentDto.company_id) {
        const newCompany = await this.companyRepository.findBy({
          id: updateContentDto.company_id,
        });
        content.company = newCompany[0];
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

  async updateStatus(id: string, updateStatusDto: UpdateStatusDto) {
    try {
      const content = await this.findOne(id);

      if (!content) {
        throw new Error('Content not found');
      }

      if (updateStatusDto.status) {
        content.status = updateStatusDto.status;
      }

      return await this.contentRepository.save(content);
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
