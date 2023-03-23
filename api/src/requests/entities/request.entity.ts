import { ApiProperty } from '@nestjs/swagger';
import {
  Currency,
  LiquidityProvider,
  Request,
  RequestStatus,
} from '@prisma/client';

export class RequestEntity implements Request {
  provider: LiquidityProvider;
  @ApiProperty()
  id: string;

  @ApiProperty()
  buyAmount: number;

  @ApiProperty({ enum: RequestStatus })
  status: RequestStatus;

  @ApiProperty({ enum: Currency })
  sourceCurrency: Currency;

  @ApiProperty({ enum: Currency })
  receiptCurrency: Currency;

  @ApiProperty()
  receiptAmount: number;

  @ApiProperty()
  bankAccountId: string;

  @ApiProperty()
  rate: number;

  @ApiProperty()
  traderId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
