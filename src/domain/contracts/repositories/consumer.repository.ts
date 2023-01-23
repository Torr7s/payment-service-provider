import { Consumer } from '@prisma/client';

import { CreateConsumerDto } from '@/domain/dtos/consumer/create-consumer.dto';

export namespace NSConsumerRepositoryCreate {
  export type Input = CreateConsumerDto;
  export type Output = Consumer;
}

export namespace NSConsumerRepositoryFindByEmail {
  export type Input = {
    email: string;
  }
  export type Output = Consumer;
}

export namespace NSConsumerRepositoryFindById {
  export type Input = {
    id: string;
  }
  export type Output = Consumer;
}

export interface IConsumerRepository {
  create: (params: NSConsumerRepositoryCreate.Input) => Promise<NSConsumerRepositoryCreate.Output>;
  findByEmail: ({ email}: NSConsumerRepositoryFindByEmail.Input) => Promise<NSConsumerRepositoryFindByEmail.Output>; 
  findById: ({ id }: NSConsumerRepositoryFindById.Input) => Promise<NSConsumerRepositoryFindById.Output>; 
}