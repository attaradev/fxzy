import {
  Controller,
  Post,
  Body,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { TradersService } from './traders.service';
import { CreateTraderDto } from './dto/create-trader.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { TraderEntity } from './entities/trader.entity';
import { SkipAuth } from 'src/auth/skip-auth.decorator';
import { SecretGuard } from 'src/auth/secret.guard';

@Controller('traders')
@ApiTags('traders')
export class TradersController {
  constructor(private readonly tradersService: TradersService) {}

  @Post()
  @SkipAuth()
  @UseGuards(SecretGuard)
  @ApiCreatedResponse({ type: TraderEntity })
  async create(@Body() createTraderDto: CreateTraderDto) {
    const trader = await this.tradersService.findByEmail(createTraderDto.email);
    if (trader) {
      throw new ConflictException('Trader already exists');
    }
    return this.tradersService.create(createTraderDto);
  }
}
