import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RequestStatus } from '@prisma/client';
import { CreateRequestDto } from './dto/create-request.dto';
import { LiquidityProviderService } from 'src/common/services/liquidity-provider.service';
import { TraderEntity } from 'src/traders/entities/trader.entity';

@Injectable()
export class RequestsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fxService: LiquidityProviderService,
  ) {}

  async create(createRequestDto: CreateRequestDto, trader: TraderEntity) {
    const createdRequest = await this.prismaService.request.create({
      data: { ...createRequestDto, traderId: trader.id },
    });

    const order = await this.fxService.buyFx({
      amount: createRequestDto.buyAmount,
      from: createRequestDto.sourceCurrency,
      to: createRequestDto.receiptCurrency,
      refId: createdRequest.id,
    });

    const status =
      order.status === 'PAID'
        ? RequestStatus.COMPLETED
        : RequestStatus.CANCELLED;

    const updatedRequest = await this.prismaService.request.update({
      where: { id: createdRequest.id },
      data: {
        status,
        rate: order.rate,
        receiptAmount: order.total,
      },
    });

    return {
      ...updatedRequest,
      status,
    };
  }

  findAll(trader: TraderEntity) {
    return this.prismaService.request.findMany({
      where: { traderId: trader.id },
    });
  }

  async findOne(id: string, trader: TraderEntity) {
    await this.validateTrader(id, trader.id);
    return this.prismaService.request.findUnique({ where: { id } });
  }

  private async validateTrader(requestId: string, traderId: string) {
    const request = await this.prismaService.request.findUnique({
      where: { id: requestId },
    });

    if (request.traderId !== traderId) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
