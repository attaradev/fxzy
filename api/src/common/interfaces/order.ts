import { Currency } from '@prisma/client';

export enum OrderStatus {
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export class Order {
  id: string;
  refId: string;
  amount: number;
  rate: number;
  total: number;
  from: Currency;
  to: Currency;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
