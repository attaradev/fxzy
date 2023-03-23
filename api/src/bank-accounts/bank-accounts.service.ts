import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { PrismaService } from 'nestjs-prisma';
import { TraderEntity } from 'src/traders/entities/trader.entity';

@Injectable()
export class BankAccountsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createBankAccountDto: CreateBankAccountDto, trader: TraderEntity) {
    return this.prismaService.bankAccount.create({
      data: { ...createBankAccountDto, traderId: trader.id },
    });
  }

  findAll(trader) {
    return this.prismaService.bankAccount.findMany({
      where: { traderId: trader.id },
    });
  }

  async findOne(id: string, trader) {
    await this.validateOwner(id, trader.id);
    return this.prismaService.bankAccount.findUnique({ where: { id } });
  }

  async update(id: string, updateBankAccountDto: UpdateBankAccountDto, trader) {
    await this.validateOwner(id, trader.id);
    return this.prismaService.bankAccount.update({
      where: { id },
      data: updateBankAccountDto,
    });
  }

  async remove(id: string, trader) {
    await this.validateOwner(id, trader.id);
    return this.prismaService.bankAccount.delete({ where: { id } });
  }

  private async validateOwner(accountId, traderId) {
    const account = await this.prismaService.bankAccount.findUnique({
      where: { id: accountId },
    });

    if (account.traderId !== traderId) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
