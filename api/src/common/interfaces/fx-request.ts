import { Currency } from '@prisma/client';

export class FxRequest {
  public readonly refId: string;
  public readonly amount: number;
  public readonly from: Currency;
  public readonly to: Currency;
}
