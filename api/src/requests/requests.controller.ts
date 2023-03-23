import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestEntity } from './entities/request.entity';
import { User } from 'src/common/decorators/user.decorator';

@Controller('requests')
@ApiTags('requests')
@ApiBearerAuth()
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @ApiCreatedResponse({ type: RequestEntity })
  create(@Body() createRequestDto: CreateRequestDto, @User() trader) {
    return this.requestsService.create(createRequestDto, trader);
  }

  @Get()
  @ApiOkResponse({ type: [RequestEntity] })
  findAll(@User() trader) {
    return this.requestsService.findAll(trader);
  }

  @Get(':id')
  @ApiOkResponse({ type: RequestEntity })
  findOne(@Param('id') id: string, @User() trader) {
    return this.requestsService.findOne(id, trader);
  }
}
