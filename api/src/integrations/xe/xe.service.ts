import { Injectable } from '@nestjs/common';
import { FxRequest } from 'src/common/interfaces/fx-request';
import { Order, OrderStatus } from 'src/common/interfaces/order';
import { LiquidityProviderService } from 'src/common/services/liquidity-provider.service';

@Injectable()
export class XeService extends LiquidityProviderService {
  private readonly rates: { [key: string]: number } = {};

  constructor() {
    super();
    this.rates['USD-GBP'] = 0.75;
    this.rates['GBP-USD'] = 1.33;
    this.rates['USD-EUR'] = 0.84;
    this.rates['EUR-USD'] = 1.19;
    this.rates['GHS-USD'] = 12.11;
  }

  public buyFx(fxRequest: FxRequest): Promise<Order> {
    const rate = this.rates[`${fxRequest.from}-${fxRequest.to}`] || 0;
    const order = {
      ...fxRequest,
      rate,
      total: rate * fxRequest.amount,
      status: rate > 1 ? OrderStatus.PAID : OrderStatus.CANCELLED,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: Date.now().toString(),
    };

    this.addOrder(order);

    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(order);
      }, 1000);
    });
  }
  public checkStatus(refId: string): Promise<Order> {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(
          this.getOrders().find(
            (order) => order.id === refId || order.refId === refId,
          ),
        );
      }, 1000);
    });
  }
}
