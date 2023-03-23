import { SetMetadata } from '@nestjs/common';

export const SkipAuth = () => SetMetadata('allowUnauthorizedRequest', true);
