import { Consumer } from '@prisma/client';

import { CreateConsumerDto } from '@/domain/dtos/consumer/create-consumer.dto';

export namespace ConsumerRepositoryCreateNS {
  export type Input = CreateConsumerDto;
  export type Output = Consumer;
}

export namespace ConsumerRepositoryFindByEmailNS {
  export type Input = {
    email: string;
  };
  export type Output = Consumer;
}

export namespace ConsumerRepositoryFindByIdNS {
  export type Input = {
    id: string;
  };
  export type Output = Consumer;
}

export interface ConsumerRepositoryInterface {
  create: (params: ConsumerRepositoryCreateNS.Input) => Promise<ConsumerRepositoryCreateNS.Output>;
  findByEmail: ({ email}: ConsumerRepositoryFindByEmailNS.Input) => Promise<ConsumerRepositoryFindByEmailNS.Output>; 
  findById: ({ id }: ConsumerRepositoryFindByIdNS.Input) => Promise<ConsumerRepositoryFindByIdNS.Output>; 
}