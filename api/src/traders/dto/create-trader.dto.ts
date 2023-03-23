import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';

export class CreateTraderDto {
  @MaxLength(25, { message: 'Email must be less than 25 characters' })
  @IsEmail(
    {
      allow_display_name: false,
      allow_utf8_local_part: true,
      require_tld: true,
    },
    { message: 'Email must be a valid email' },
  )
  @ApiProperty({
    required: true,
    example: 'test@example.com',
    description: 'Traders email',
    nullable: false,
  })
  email: string;

  @ApiProperty({
    required: true,
    example: 'auth0|123456789',
    description: 'Traders sub',
    nullable: false,
  })
  sub: string;
}
