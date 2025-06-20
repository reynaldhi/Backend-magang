import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { Content } from './entity/content.entity';
import { TypeContent } from '../typeContent/entity/typeContent.entity';
import { TypeContentController } from '../typeContent/typeContent.controller';
import { TypeContentService } from '../typeContent/typeContent.service';

@Module({
  imports: [TypeOrmModule.forFeature([Content, TypeContent])],
  controllers: [ContentController, TypeContentController],
  providers: [ContentService, TypeContentService],
  exports: [ContentService, TypeContentService],
})
export class ContentModule {}
