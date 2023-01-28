import { PaymentMethod, Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime';

import { ConsumerEntity } from './consumer.entity';
import { PayableEntity } from './payable.entity';

export class TransactionEntity {
  id?: string;
  value: string | number | Prisma.Decimal | DecimalJsLike;
  description: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardOwnerName: string;
  cardExpirationDate: string | Date;
  cardCVV: string;
  consumer: ConsumerEntity;
  payable: PayableEntity;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}