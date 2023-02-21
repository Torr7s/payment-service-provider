import { HttpStatus } from '@nestjs/common';
import { PayableStatus } from '@prisma/client';

import { UseCase } from '../../use-case';

import { PayableRepository } from '@/app/abstracts/repositories/payable.repository';
import { PayableEntity } from '@/app/entities/payable.entity';
import { PayableException } from '@/app/exceptions/payable.exception';

export interface ListUserPayablesUseCaseInput {
  userId: string;
  payableStatus: PayableStatus;
}

export interface ListUserPayablesUseCaseOutput {
  payables: PayableEntity[];
} 

export class ListUserPayablesUseCase implements
  UseCase<
    ListUserPayablesUseCaseInput,
    ListUserPayablesUseCaseOutput
  > {
  constructor(private readonly payableRepository: PayableRepository) {}

  public async exec(input: ListUserPayablesUseCaseInput): Promise<ListUserPayablesUseCaseOutput> {
    const status = {
      available: PayableStatus.paid,
      waiting_funds: PayableStatus.waiting_funds
    }

    const statusMatched: PayableStatus = status[input.payableStatus];

    if (!statusMatched) {
      throw new PayableException(
        'Invalid payable status provided! Acceptable options: available, waiting_funds',
        HttpStatus.BAD_REQUEST
      );
    }

    const payables: PayableEntity[] = await this.payableRepository.listUserPayables(input.userId, statusMatched);

    return {
      payables
    }
  }
}