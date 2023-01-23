import { 
  IConsumerRepository, 
  NSConsumerRepositoryCreate, 
  NSConsumerRepositoryFindByEmail, 
  NSConsumerRepositoryFindById 
} from '@/domain/contracts/repositories';

export abstract class ConsumerRepository implements IConsumerRepository {
  public abstract create(params: NSConsumerRepositoryCreate.Input): Promise<NSConsumerRepositoryCreate.Output>;
  public abstract findByEmail: ({ email }: NSConsumerRepositoryFindByEmail.Input) => Promise<NSConsumerRepositoryFindByEmail.Output>;
  public abstract findById: ({ id }: NSConsumerRepositoryFindById.Input) => Promise<NSConsumerRepositoryFindById.Output>;
}