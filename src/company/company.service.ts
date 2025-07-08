import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Brackets, EntityNotFoundError, Repository } from 'typeorm';
import { Company } from './entity/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return this.companyRepository.save(createCompanyDto);
    } catch (e) {
      console.error('Error create company:', e);
      throw new Error('Failed to create company');
    }
  }

  async findAll(search) {
    const dataCompany =
      this.companyRepository.createQueryBuilder('typeContent');
    if (search) {
      dataCompany.andWhere(
        new Brackets((qb) => {
          qb.where('typeContent.name ilike :search', {
            search: `%${search}%`,
          });
        }),
      );
    }

    const data = await dataCompany.getMany();
    const count = await dataCompany.getCount();

    return {
      data: data,
      count: count,
    };
  }

  async findOne(id: string) {
    return this.companyRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      await this.companyRepository.findOneOrFail({ where: { id } });
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

    await this.companyRepository.update(id, updateCompanyDto);

    return this.companyRepository.findOneOrFail({ where: { id } });
  }

  async delete(id: string) {
    try {
      await this.companyRepository.findOneOrFail({ where: { id } });

      await this.companyRepository.update(id, {
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
