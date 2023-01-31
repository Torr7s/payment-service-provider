import { PayableStatus, PaymentMethod } from '@prisma/client';

import { TransactionEntity } from '@/domain/entities/transaction.entity';

import { PayableRepository } from '@/app/abstracts/repositories/payable.repository';
import { PayableEntity } from '@/domain/entities/payable.entity';

import { ICreatePayableUseCase } from '@/domain/use-cases/payable';

import { calculateFee } from '@/infra/helpers/payable';

export class CreatePayableUseCase implements ICreatePayableUseCase {
  constructor(private readonly payableRepository: PayableRepository) {}

  public async exec(transaction: TransactionEntity): Promise<PayableEntity> {
    let payable: PayableEntity;

    const commonProps = {
      fee: calculateFee(transaction),
      transactionId: transaction.id,
      userId: transaction.userId
    }

    if (transaction.paymentMethod === PaymentMethod.credit_card) {
      const createdAt: Date = transaction.createdAt;
      const createdAtPlus30Days: Date = new Date(createdAt.setDate(createdAt.getDate() + 30));

      payable = await this.payableRepository.create({
        ...commonProps,
        status: PayableStatus.waiting_funds,
        paymentDate: createdAtPlus30Days,
      });
    } else if (transaction.paymentMethod === PaymentMethod.debit_card) {
      payable = await this.payableRepository.create({
        ...commonProps,
        status: PayableStatus.paid,
        paymentDate: transaction.createdAt,
      });
    }

    return payable;
  }
}