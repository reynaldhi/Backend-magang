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
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('v1/content')
@Controller('v1/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  async create(@Body() createContentDto: CreateContentDto) {
    try {
      await this.contentService.create(createContentDto);

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
    const { data, count } = await this.contentService.findAll(search);

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
      data: await this.contentService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateContentDto: UpdateContentDto,
  ) {
    return {
      data: await this.contentService.update(id, updateContentDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return {
      data: await this.contentService.updateStatus(id, updateStatusDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.contentService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
