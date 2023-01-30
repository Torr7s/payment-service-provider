import { PayableStatus } from '@prisma/client';

import { PayableEntity } from '../entities/payable.entity';

export interface IPayableRepository {
  create: (data: PayableEntity) => Promise<PayableEntity>;
  listUserPayables: (userId: string, payableStatus: PayableStatus) => Promise<Array<PayableEntity>>;
}