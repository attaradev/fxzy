import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class SecretGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const secret = context.switchToHttp().getRequest().headers['x-secret-key'];
    const secretKey = this.configService.get('auth0.secret');
    if (secret !== secretKey) {
      throw new UnauthorizedException('Invalid secret key');
    }
    return true;
  }
}
