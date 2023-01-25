import { Consumer } from '@prisma/client';

export interface IFindConsumerByIdUseCase {
  exec: (id: string) => Promise<Consumer>;
}