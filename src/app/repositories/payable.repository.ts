import { Payable } from '../entities/payable';

import { PayableStatus } from '@/src/types';

export abstract class PayableRepository {
  public abstract create: (data: Payable) => Promise<Payable>;
  public abstract listUserPayables: (userId: string, payableStatus: PayableStatus) => Promise<Array<Payable>>;
}