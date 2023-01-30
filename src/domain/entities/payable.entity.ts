import { PayableStatus, Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime';

import { BaseEntity } from './base.entity';

export class PayableEntity extends BaseEntity {
  status: PayableStatus;
  paymentDate: string | Date;
  fee: string | number | Prisma.Decimal | DecimalJsLike;
  consumerId: string;
  transactionId: string;
}