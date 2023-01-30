import { BadRequestException } from '@nestjs/common';
import { PayableStatus, PaymentMethod } from '@prisma/client';

import { PayableRepository } from '@/app/abstracts/repositories/payable.repository';
import { TransactionRepository } from '@/app/abstracts/repositories/transaction.repository';

import { PayableEntity } from '@/domain/entities/payable.entity';
import { TransactionEntity } from '@/domain/entities/transaction.entity';

import { ICreatePayableUseCase } from '@/domain/use-cases/payable';

import { calculateFee } from '@/infra/helpers/payable';

export class CreatePayableUseCase implements ICreatePayableUseCase {
  constructor(
    private readonly payableRepository: PayableRepository,
    private readonly transactionRepository: TransactionRepository
  ) {}

  public async exec(transactionId: string): Promise<PayableEntity> {
    const transaction: TransactionEntity = await this.transactionRepository.findById(transactionId);

    if (!transaction) {
      throw new BadRequestException(
        `Invalid transaction provided`
      );
    }

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