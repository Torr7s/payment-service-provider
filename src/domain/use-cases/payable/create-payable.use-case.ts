import { PayableEntity } from '@/domain/entities/payable.entity';

export interface ICreatePayableUseCase {
  exec: (transactionId: string) => Promise<PayableEntity>;
}