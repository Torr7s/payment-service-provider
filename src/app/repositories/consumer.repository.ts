import { 
  ConsumerRepositoryCreateNS, 
  ConsumerRepositoryFindByEmailNS, 
  ConsumerRepositoryFindByIdNS, 
  ConsumerRepositoryInterface 
} from '@/domain/contracts/repositories';

export abstract class ConsumerRepository implements ConsumerRepositoryInterface {
  public abstract create(params: ConsumerRepositoryCreateNS.Input): Promise<ConsumerRepositoryCreateNS.Output>;
  public abstract findByEmail: ({ email }: ConsumerRepositoryFindByEmailNS.Input) => Promise<ConsumerRepositoryFindByEmailNS.Output>;
  public abstract findById: ({ id }: ConsumerRepositoryFindByIdNS.Input) => Promise<ConsumerRepositoryFindByIdNS.Output>;
}