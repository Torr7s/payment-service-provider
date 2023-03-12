import { PaymentMethod, Prisma } from '@prisma/client';

import { Transaction, TransactionProps } from './transaction.entity';

import { makeCard } from '@/test/factories/card.factory';

describe('Transaction entity', (): void => {
  it('should create a transaction', (): void => {
    const props: TransactionProps = {
      card: makeCard(),
      description: 'Fake transaction description',
      paymentMethod: PaymentMethod.credit_card,
      userId: 'fake_user_id',
      value: new Prisma.Decimal('199.99'),
      createdAt: new Date()
    }

    const transaction = new Transaction(props);

    expect(transaction.id).toBeDefined();
    expect(transaction.description).toEqual(props.description);
  });
});