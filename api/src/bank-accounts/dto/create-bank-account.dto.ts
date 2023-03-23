import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '@prisma/client';

export class CreateBankAccountDto {
  @ApiProperty({ required: true, example: 'Current' })
  name: string;

  @ApiProperty({ enum: Currency, required: true })
  currency: Currency;

  @ApiProperty({ required: true, example: '123456789' })
  accountNumber: string;
}
