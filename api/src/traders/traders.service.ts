import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTraderDto } from './dto/create-trader.dto';

@Injectable()
export class TradersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTraderDto: CreateTraderDto) {
    return this.prismaService.trader.create({ data: createTraderDto });
  }

  findByEmail(email: string) {
    return this.prismaService.trader.findUnique({ where: { email } });
  }

  findAll() {
    return this.prismaService.trader.findMany();
  }

  findBySub(sub: string) {
    return this.prismaService.trader.findUnique({ where: { sub } });
  }
}
