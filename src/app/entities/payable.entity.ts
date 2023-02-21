import { Prisma } from '@prisma/client';

import { PayableStatus } from '@/@types';

import { BaseEntity } from './base.entity';

export class PayableEntity extends BaseEntity {
  status: PayableStatus;
  paymentDate: string | Date;
  fee: string | Prisma.Decimal;
  userId: string;
  transactionId: string;
}