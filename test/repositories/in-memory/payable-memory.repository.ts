import { PayableStatus } from '@prisma/client';

import { Payable } from '@/src/app/entities/payable';
import { PayableRepository } from '@/src/app/repositories/payable.repository';

export class PayableInMemoryRepository implements PayableRepository {
  private readonly payables: Array<Payable>;

  constructor() {
    this.payables = [];
  }

  public async create(data: Payable): Promise<Payable> {
    const element: number = this.payables.push(data);

    return this.payables[element - 1];
  }

  public async listUserPayables(userId: string, payableStatus: PayableStatus): Promise<Array<Payable>> {
    return this.payables.filter(payable => 
      payable.userId === userId && 
      payable.status === payableStatus
    );
  }
}