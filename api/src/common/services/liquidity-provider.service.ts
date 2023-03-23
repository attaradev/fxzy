import { FxRequest } from '../interfaces/fx-request';
import { Order } from '../interfaces/order';

export abstract class LiquidityProviderService {
  private readonly orders: { [key: string | number]: Order } = {};

  public abstract buyFx(fxRequest: FxRequest): Promise<Order>;

  public abstract checkStatus(requestId: string): Promise<Order>;

  protected getOrders(): Order[] {
    return Object.values(this.orders);
  }

  protected addOrder(order: Order): void {
    this.orders[order.id] = order;
  }
}
