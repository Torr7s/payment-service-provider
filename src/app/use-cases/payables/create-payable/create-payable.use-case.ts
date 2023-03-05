import { PayableStatus, PaymentMethod } from '@prisma/client';

import { UseCase } from '../../use-case';

import { PayableEntity } from '@/src/app/entities/payable.entity';
import { TransactionEntity } from '@/src/app/entities/transaction.entity';
import { PayableRepository } from '@/src/app/repositories/payable.repository';

import { calculateFee } from '@/src/app/helpers/payable';

export interface CreatePayableUseCaseInput {
  transaction: TransactionEntity;
}

export interface CreatePayableUseCaseOutput {
  payable: PayableEntity;
}

export class CreatePayableUseCase implements
  UseCase<
    CreatePayableUseCaseInput,
    CreatePayableUseCaseOutput
  > {
  constructor(private readonly payableRepository: PayableRepository) {}

  public async exec(input: CreatePayableUseCaseInput): Promise<CreatePayableUseCaseOutput> {
    let payable: PayableEntity;

    const commonProps = {
      fee: calculateFee(input.transaction),
      transactionId: input.transaction.id,
      userId: input.transaction.userId
    }

    if (input.transaction.paymentMethod === PaymentMethod.credit_card) {
      const createdAt: Date = input.transaction.createdAt;
      const createdAtPlus30Days: Date = new Date(createdAt.setDate(createdAt.getDate() + 30));

      payable = await this.payableRepository.create({
        ...commonProps,
        status: PayableStatus.waiting_funds,
        paymentDate: createdAtPlus30Days,
      });
    } else if (input.transaction.paymentMethod === PaymentMethod.debit_card) {
      payable = await this.payableRepository.create({
        ...commonProps,
        status: PayableStatus.paid,
        paymentDate: input.transaction.createdAt,
      });
    }

    return {
      payable
    }
  }
}