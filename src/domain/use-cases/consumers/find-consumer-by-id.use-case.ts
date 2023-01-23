import { Consumer } from '@prisma/client';

export namespace NSFindConsumerByIdUseCase {
  export type Input = {
    id: string;
  }
  export type Output = Consumer;
}

export interface IFindConsumerByIdUseCase {
  findById: ({ id }: NSFindConsumerByIdUseCase.Input) => Promise<NSFindConsumerByIdUseCase.Output>;
}