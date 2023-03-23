import { Module } from '@nestjs/common';
import { XeService } from './xe/xe.service';

@Module({
  providers: [XeService],
  exports: [XeService],
})
export class IntegrationsModule {}
