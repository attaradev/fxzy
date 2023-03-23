import { ApiProperty } from '@nestjs/swagger';
import { Trader } from '@prisma/client';

export class TraderEntity implements Trader {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  sub: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
