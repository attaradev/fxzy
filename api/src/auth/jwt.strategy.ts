import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { TradersService } from 'src/traders/traders.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private traderService: TradersService,
  ) {
    const domain = configService.get('auth0.domain');
    const audience = configService.get('auth0.audience');

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${domain}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience,
      issuer: `${domain}`,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.traderService.findBySub(payload.sub);
    if (!user) {
      return done(new UnauthorizedException(), null);
    }
    return done(null, {
      sub: user.sub,
      id: user.id,
      email: user.email,
    });
  }
}
