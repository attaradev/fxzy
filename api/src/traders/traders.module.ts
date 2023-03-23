import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { TradersService } from './traders.service';
import { TradersController } from './traders.controller';

@Module({
  controllers: [TradersController],
  providers: [TradersService, PrismaService],
  exports: [TradersService],
})
export class TradersModule {}
