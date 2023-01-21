import { Consumer } from '@prisma/client';

import { 
  ConsumerRepositoryCreateNS, 
  ConsumerRepositoryFindByEmailNS, 
  ConsumerRepositoryFindByIdNS, 
  ConsumerRepositoryInterface 
} from '@/domain/contracts/repositories';

export abstract class ConsumersRepository implements ConsumerRepositoryInterface {
  public abstract create(params: ConsumerRepositoryCreateNS.Input): Promise<ConsumerRepositoryCreateNS.Output>;
  public abstract findByEmail: ({ email }: ConsumerRepositoryFindByEmailNS.Input) => Promise<Consumer>;
  public abstract findById: ({ id }: ConsumerRepositoryFindByIdNS.Input) => Promise<Consumer>;
}