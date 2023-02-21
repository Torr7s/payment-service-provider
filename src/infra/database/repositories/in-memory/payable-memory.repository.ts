import { PayableStatus } from '@prisma/client';

import { PayableRepository } from '@/app/abstracts/repositories/payable.repository';

import { PayableEntity } from '@/app/entities/payable.entity';

export class PayableInMemoryRepository implements PayableRepository {
  private readonly payables: Array<PayableEntity>;

  constructor() {
    this.payables = [];
  }

  public async create(data: PayableEntity): Promise<PayableEntity> {
    const element: number = this.payables.push(data);

    return this.payables[element - 1];
  }

  public async listUserPayables(userId: string, payableStatus: PayableStatus): Promise<Array<PayableEntity>> {
    return this.payables.filter(payable => 
      payable.userId === userId && 
      payable.status === payableStatus
    );
  }
}