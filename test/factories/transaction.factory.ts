import { PaymentMethod, Prisma } from '@prisma/client';

import { makeCard } from './card.factory';

import { Transaction, TransactionProps } from '../app/entities/transaction';

export const makeTransaction = (transaction: Partial<TransactionProps> = {}): Transaction => {
  return new Transaction({
    card: makeCard(),
    description: 'Fake transaction description',
    paymentMethod: PaymentMethod.credit_card,
    userId: 'fake_user_id',
    value: new Prisma.Decimal('599.99'),
    ...transaction
  });
}