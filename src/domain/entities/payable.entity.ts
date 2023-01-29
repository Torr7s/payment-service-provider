import { PayableStatus, Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime';

import { ConsumerEntity } from './consumer.entity';
import { TransactionEntity } from './transaction.entity';

export class PayableEntity {
  id?: string;
  status: PayableStatus;
  paymentDate: string | Date;
  fee: string | number | Prisma.Decimal | DecimalJsLike;
  consumer?: ConsumerEntity;
  consumerId: string;
  transaction?: TransactionEntity;
  transactionId: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}