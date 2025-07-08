import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerDto } from './dto/banner.dto';

@Controller('v1/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  async create(@Body() bannerDto: BannerDto) {
    try {
      await this.bannerService.create(bannerDto);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'success',
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(@Query('search') search: string) {
    const { data, count } = await this.bannerService.findAll(search);

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.bannerService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() bannerDto: BannerDto,
  ) {
    return {
      data: await this.bannerService.update(id, bannerDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.bannerService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
