import { Consumer } from '@prisma/client'

export namespace NSFindConsumerByEmailUseCase {
  export type Input = {
    email: string;
  }
  export type Output = Consumer;
}

export interface IFindConsumerByEmailUseCase {
  findByEmail: ({ email }: NSFindConsumerByEmailUseCase.Input) => Promise<NSFindConsumerByEmailUseCase.Output>;
}