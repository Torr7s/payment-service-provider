import { PayableStatus, PaymentMethod } from '@prisma/client';

import { UseCase } from '../../use-case';

import { PayableRepository } from '@/app/abstracts/repositories/payable.repository';
import { PayableEntity } from '@/domain/entities/payable.entity';

import { CreatePayableUseCaseInput, CreatePayableUseCaseOutput } from '@/domain/use-cases/payable';

import { calculateFee } from '@/infra/helpers/payable';

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