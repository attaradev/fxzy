import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, PrismaService],
})
export class BankAccountsModule {}
