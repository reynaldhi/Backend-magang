import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { TypeContent } from '../typeContent/entity/typeContent.entity';
import { Content } from '../content/entity/content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, TypeContent])],
  controllers: [BannerController],
  providers: [BannerService],
  exports: [BannerService],
})
export class BannerModule {}
