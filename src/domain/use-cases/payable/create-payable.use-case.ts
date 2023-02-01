import { PayableEntity } from '@/domain/entities/payable.entity';
import { TransactionEntity } from '@/domain/entities/transaction.entity';

export interface CreatePayableUseCaseInput {
  transaction: TransactionEntity;
}

export interface CreatePayableUseCaseOutput {
  payable: PayableEntity;
}