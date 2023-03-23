import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { PrismaService } from 'nestjs-prisma';
import { XeService } from 'src/integrations/xe/xe.service';
import { LiquidityProviderService } from 'src/common/services/liquidity-provider.service';

@Module({
  controllers: [RequestsController],
  providers: [
    RequestsService,
    PrismaService,
    { provide: LiquidityProviderService, useClass: XeService },
  ],
})
export class RequestsModule {}
