import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeContent } from '../typeContent/entity/typeContent.entity';
import { Content } from '../content/entity/content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, TypeContent])],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
