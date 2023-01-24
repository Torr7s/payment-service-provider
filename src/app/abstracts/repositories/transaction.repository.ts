import { 
  ITransactionRepository,
  NSTransactionRepositoryCreate, 
  NSTransactionRepositoryFindById, 
  NSTransactionRepositoryList
} from '@/domain/contracts/repositories';

export abstract class TransactionRepository implements ITransactionRepository {
  public abstract create: (params: NSTransactionRepositoryCreate.Input) => Promise<NSTransactionRepositoryCreate.Output>;
  public abstract findById: ({ id }: NSTransactionRepositoryFindById.Input) => Promise<NSTransactionRepositoryCreate.Output>;
  public abstract list: ({ consumerId }: NSTransactionRepositoryList.Input) => Promise<NSTransactionRepositoryList.Output>;
}