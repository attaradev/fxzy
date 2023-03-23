import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BankAccountEntity } from './entities/bank-account.entity';
import { User } from 'src/common/decorators/user.decorator';

@Controller('bank-accounts')
@ApiTags('bank-accounts')
@ApiBearerAuth()
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  @ApiCreatedResponse({ type: BankAccountEntity })
  create(@Body() createBankAccountDto: CreateBankAccountDto, @User() trader) {
    return this.bankAccountsService.create(createBankAccountDto, trader);
  }

  @Get()
  @ApiOkResponse({ type: [BankAccountEntity] })
  findAll(@User() trader) {
    return this.bankAccountsService.findAll(trader);
  }

  @Get(':id')
  @ApiOkResponse({ type: BankAccountEntity })
  findOne(@Param('id') id: string, @User() trader) {
    return this.bankAccountsService.findOne(id, trader);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BankAccountEntity })
  update(
    @Param('id') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
    @User() trader,
  ) {
    return this.bankAccountsService.update(id, updateBankAccountDto, trader);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string, @User() trader) {
    return this.bankAccountsService.remove(id, trader);
  }
}
