import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { Content } from './entity/content.entity';
import { TypeContent } from '../typeContent/entity/typeContent.entity';
import { TypeContentController } from '../typeContent/typeContent.controller';
import { TypeContentService } from '../typeContent/typeContent.service';
import { Company } from '../company/entity/company.entity';
import { CompanyController } from '../company/company.controller';
import { CompanyService } from '../company/company.service';

@Module({
  imports: [TypeOrmModule.forFeature([Content, TypeContent, Company])],
  controllers: [ContentController, TypeContentController, CompanyController],
  providers: [ContentService, TypeContentService, CompanyService],
  exports: [ContentService, TypeContentService, CompanyService],
})
export class ContentModule {}
