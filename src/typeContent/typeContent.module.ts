import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeContentService } from './typeContent.service';
import { TypeContentController } from './typeContent.controller';
import { TypeContent } from './entity/typeContent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeContent])],
  controllers: [TypeContentController],
  providers: [TypeContentService],
  exports: [TypeContentService],
})
export class TypeContentModule {}
