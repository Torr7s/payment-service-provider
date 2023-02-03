import { PayableStatus } from '@/@types';

import { PayableEntity } from '@/domain/entities/payable.entity';

export interface ListUserPayablesUseCaseInput {
  userId: string;
  payableStatus: PayableStatus;
}

export interface ListUserPayablesUseCaseOutput {
  payables: PayableEntity[];
} 