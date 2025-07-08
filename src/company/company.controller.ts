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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('v1/company')
@Controller('v1/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create Company' })
  @ApiResponse({
    status: 201,
    description: 'Company created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({
    type: CreateCompanyDto,
    schema: {
      example: {
        name: 'sertifikasi',
      },
    },
  })
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    try {
      await this.companyService.create(createCompanyDto);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'success',
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get Company' })
  @ApiResponse({
    status: 200,
  })
  async findAll(@Query('search') search: string) {
    const { data, count } = await this.companyService.findAll(search);

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Company' })
  @ApiResponse({
    status: 200,
    description: 'Company created successfully.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.companyService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Company' })
  @ApiResponse({
    status: 200,
    description: 'Company updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({
    type: UpdateCompanyDto,
    schema: {
      example: {
        name: 'sertifikasi',
      },
    },
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return {
      data: await this.companyService.update(id, updateCompanyDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Create Company' })
  @ApiResponse({
    status: 200,
    description: 'Company deleted successfully.',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.companyService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
