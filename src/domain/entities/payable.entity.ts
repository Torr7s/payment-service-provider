import { PayableStatus, Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime';

import { BaseEntity } from './base.entity';
import { ConsumerEntity } from './consumer.entity';
import { TransactionEntity } from './transaction.entity';

export class PayableEntity extends BaseEntity {
  status: PayableStatus;
  paymentDate: string | Date;
  fee: string | number | Prisma.Decimal | DecimalJsLike;
  consumer?: ConsumerEntity;
  consumerId: string;
  transaction?: TransactionEntity;
  transactionId: string;
}