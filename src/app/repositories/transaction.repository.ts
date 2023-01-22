import { 
  TransactionRepositoryCreateNS, 
  TransactionRepositoryFindByIdNS, 
  TransactionRepositoryInterface 
} from '@/domain/contracts/repositories';

export abstract class TransactionRepository implements TransactionRepositoryInterface {
  public abstract create: (params: TransactionRepositoryCreateNS.Input) => Promise<TransactionRepositoryCreateNS.Output>;
  public abstract findById: ({ id }: TransactionRepositoryFindByIdNS.Input) => Promise<TransactionRepositoryCreateNS.Output>;
}