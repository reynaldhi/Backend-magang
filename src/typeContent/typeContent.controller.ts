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
import { TypeContentService } from './typeContent.service';
import { CreateTypeContentDto } from './dto/create-typeContent.dto';
import { UpdateTypeContentDto } from './dto/update-typeContent.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('v1/type-content')
@Controller('v1/type-content')
export class TypeContentController {
  constructor(private readonly typeContentService: TypeContentService) {}

  @Post()
  @ApiOperation({ summary: 'Create Type Content' })
  @ApiResponse({
    status: 201,
    description: 'Type Content created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({
    type: CreateTypeContentDto,
    schema: {
      example: {
        name: 'sertifikasi',
      },
    },
  })
  async create(@Body() createTypeContentDto: CreateTypeContentDto) {
    try {
      await this.typeContentService.create(createTypeContentDto);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'success',
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get Type Content' })
  @ApiResponse({
    status: 200,
  })
  async findAll(@Query('search') search: string) {
    const { data, count } = await this.typeContentService.findAll(search);

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Type Content' })
  @ApiResponse({
    status: 200,
    description: 'Type Content created successfully.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.typeContentService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Type Content' })
  @ApiResponse({
    status: 200,
    description: 'Type Content updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({
    type: UpdateTypeContentDto,
    schema: {
      example: {
        name: 'sertifikasi',
      },
    },
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTypeContentDto: UpdateTypeContentDto,
  ) {
    return {
      data: await this.typeContentService.update(id, updateTypeContentDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Create Type Content' })
  @ApiResponse({
    status: 200,
    description: 'Type Content deleted successfully.',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.typeContentService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
