import { 
  ITransactionRepository,
  NSTransactionRepositoryCreate, 
  NSTransactionRepositoryFindById 
} from '@/domain/contracts/repositories';

export abstract class TransactionRepository implements ITransactionRepository {
  public abstract create: (params: NSTransactionRepositoryCreate.Input) => Promise<NSTransactionRepositoryCreate.Output>;
  public abstract findById: ({ id }: NSTransactionRepositoryFindById.Input) => Promise<NSTransactionRepositoryCreate.Output>;
}