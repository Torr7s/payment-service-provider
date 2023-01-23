import { Consumer } from '@prisma/client';

import { CreateConsumerDto } from '../../dtos/consumer/create-consumer.dto';

export namespace NSCreateConsumerUseCase {
  export type Input = CreateConsumerDto;
  export type Output = Consumer;
}

export interface ICreateConsumerUseCase {
  execute: (params: NSCreateConsumerUseCase.Input) => Promise<NSCreateConsumerUseCase.Output>;
}