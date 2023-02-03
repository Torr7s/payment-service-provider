import { PayableEntity } from '../entities/payable.entity';

import { PayableStatus } from '@/@types';

export interface IPayableRepository {
  create: (data: PayableEntity) => Promise<PayableEntity>;
  listUserPayables: (userId: string, payableStatus: PayableStatus) => Promise<Array<PayableEntity>>;
}