import { PayableEntity } from '../entities/payable.entity';

export interface IPayableRepository {
  create: (data: PayableEntity) => Promise<PayableEntity>;
}