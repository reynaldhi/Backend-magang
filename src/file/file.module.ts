import { Module } from '@nestjs/common';
import { UploadController } from './file.controller';

@Module({
  controllers: [UploadController],
})
export class UploadModule {}
