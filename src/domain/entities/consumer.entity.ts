import { BaseEntity } from './base.entity';
import { PayableEntity } from './payable.entity';
import { TransactionEntity } from './transaction.entity';

export class ConsumerEntity extends BaseEntity {
  userId: string;
  transactions?: Array<TransactionEntity>;
  payables?: Array<PayableEntity>;
}