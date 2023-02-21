import { Prisma } from '@prisma/client';

import { PaymentMethod } from '@/@types';

import { BaseEntity } from './base.entity';
import { PayableEntity } from './payable.entity';

export class TransactionEntity extends BaseEntity {
  value: string | Prisma.Decimal;
  description: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardOwnerName: string;
  cardExpirationDate: string | Date;
  cardCVV: string;
  userId?: string;
  payable?: PayableEntity;
}