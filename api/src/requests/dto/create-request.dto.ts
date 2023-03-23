import { ApiProperty } from '@nestjs/swagger';
import { Currency, LiquidityProvider } from '@prisma/client';

export class CreateRequestDto {
  @ApiProperty({ example: 10, required: true })
  buyAmount: number;

  @ApiProperty({ enum: Currency, example: 'GHS', required: true })
  sourceCurrency: Currency;

  @ApiProperty({ enum: Currency, example: 'USD', required: true })
  receiptCurrency: Currency;

  @ApiProperty({ example: 'samplkejue', required: true })
  bankAccountId: string;

  @ApiProperty({
    enum: LiquidityProvider,
    example: LiquidityProvider.XE,
    required: true,
  })
  provider: LiquidityProvider;
}
