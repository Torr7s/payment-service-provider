import { PayableEntity } from '../entities/payable.entity';
import { PayableStatus } from '@/src/types';

export abstract class PayableRepository {
  public abstract create: (data: PayableEntity) => Promise<PayableEntity>;
  public abstract listUserPayables: (userId: string, payableStatus: PayableStatus) => Promise<Array<PayableEntity>>;
}