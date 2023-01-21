import { Consumer } from '@prisma/client';

import { CreateConsumerDto } from '../../dtos/consumer/create-consumer.dto';

export namespace CreateConsumerUseCaseNS {
  export type Input = CreateConsumerDto;
  export type Output = Consumer;
}

export interface CreatConsumerUseCaseDomain {
  execute: (params: CreateConsumerUseCaseNS.Input) => Promise<CreateConsumerUseCaseNS.Output>;
}