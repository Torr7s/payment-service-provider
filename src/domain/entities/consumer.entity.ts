import { PayableEntity } from './payable.entity';
import { TransactionEntity } from './transaction.entity';
import { UserEntity } from './user.entity';

export class ConsumerEntity {
  id?: string;
  userProfile?: UserEntity;
  transactions?: Array<TransactionEntity>;
  payables?: Array<PayableEntity>;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}