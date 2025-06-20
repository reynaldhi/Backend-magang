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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('v1/content')
@Controller('v1/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @ApiOperation({ summary: 'Create Type Content' })
  @ApiResponse({
    status: 201,
    description: 'Content created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({
    type: CreateContentDto,
    schema: {
      example: {
        title: 'title',
        contents: 'content',
        typeContent_id: 'id',
      },
    },
  })
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

  @ApiOperation({ summary: 'Get content' })
  @ApiResponse({
    status: 200,
  })
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
  @ApiOperation({ summary: 'Get detail content' })
  @ApiResponse({
    status: 200,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.contentService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Content' })
  @ApiResponse({
    status: 200,
    description: 'Content updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({
    type: CreateContentDto,
    schema: {
      example: {
        title: 'title',
        contents: 'content',
        typeContent_id: 'id',
      },
    },
  })
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

  @Delete(':id')
  @ApiOperation({ summary: 'Create Type Content' })
  @ApiResponse({
    status: 200,
    description: 'Content deleted successfully.',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.contentService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
