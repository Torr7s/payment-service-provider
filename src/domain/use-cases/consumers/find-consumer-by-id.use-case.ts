import { Consumer } from '@prisma/client';

export namespace NSFindConsumerByIdUseCase {
  export type Input = {
    id: string;
  }
  export type Output = Consumer;
}

export interface IFindConsumerByIdUseCase {
  execute: ({ id }: NSFindConsumerByIdUseCase.Input) => Promise<NSFindConsumerByIdUseCase.Output>;
}