import { PayableStatus } from '@prisma/client';

import { PayableEntity } from '@/domain/entities/payable.entity';

import { IPayableRepository } from '@/domain/repositories/payable.repository';

export abstract class PayableRepository implements IPayableRepository {
  public abstract create: (data: PayableEntity) => Promise<PayableEntity>;
  public abstract listPayables: (consumerId: string, payableStatus: PayableStatus) => Promise<Array<PayableEntity>>;
}