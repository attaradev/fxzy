import { ApiProperty } from '@nestjs/swagger';
import { BankAccount, Currency } from '@prisma/client';

export class BankAccountEntity implements BankAccount {
  @ApiProperty()
  id: string;

  @ApiProperty()
  accountNumber: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  currency: Currency;

  @ApiProperty()
  traderId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
