import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TradersModule } from './traders/traders.module';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { RequestsModule } from './requests/requests.module';
import { IntegrationsModule } from './integrations/integrations.module';
import configurations from './config/configurations';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    TradersModule,
    BankAccountsModule,
    RequestsModule,
    IntegrationsModule,
    ConfigModule.forRoot({ load: [configurations], isGlobal: true }),
  ],
})
export class AppModule {}
