import { PayableEntity } from '@/domain/entities/payable.entity';
import { TransactionEntity } from '@/domain/entities/transaction.entity';

export interface ICreatePayableUseCase {
  exec: (transaction: TransactionEntity) => Promise<PayableEntity>;
}