import { PayableEntity } from './payable.entity';
import { TransactionEntity } from './transaction.entity';

export class ConsumerEntity {
  id?: string;
  userId: string;
  transactions?: Array<TransactionEntity>;
  payables?: Array<PayableEntity>;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}