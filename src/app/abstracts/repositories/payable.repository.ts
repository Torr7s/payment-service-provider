import { PayableStatus } from '@/@types';

import { PayableEntity } from '@/app/entities/payable.entity';

export abstract class PayableRepository {
  public abstract create: (data: PayableEntity) => Promise<PayableEntity>;
  public abstract listUserPayables: (userId: string, payableStatus: PayableStatus) => Promise<Array<PayableEntity>>;
}