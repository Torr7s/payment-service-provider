import { Consumer } from '@prisma/client'

export namespace NSFindConsumerByEmailUseCase {
  export type Input = {
    email: string;
  }
  export type Output = Consumer;
}

export interface IFindConsumerByEmailUseCase {
  execute: ({ email }: NSFindConsumerByEmailUseCase.Input) => Promise<NSFindConsumerByEmailUseCase.Output>;
}