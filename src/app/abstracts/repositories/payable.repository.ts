import { PayableStatus } from '@/@types';

import { PayableEntity } from '@/domain/entities/payable.entity';
import { IPayableRepository } from '@/domain/repositories/payable.repository';

export abstract class PayableRepository implements IPayableRepository {
  public abstract create: (data: PayableEntity) => Promise<PayableEntity>;
  public abstract listUserPayables: (userId: string, payableStatus: PayableStatus) => Promise<Array<PayableEntity>>;
}