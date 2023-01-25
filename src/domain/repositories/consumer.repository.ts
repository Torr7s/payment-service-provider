import { Consumer } from '@prisma/client';

export interface IConsumerRepository {
  findById: (id: string) => Promise<Consumer>; 
}