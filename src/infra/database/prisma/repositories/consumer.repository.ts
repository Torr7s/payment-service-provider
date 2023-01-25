import { Consumer } from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { ConsumerRepository } from '@/app/abstracts/repositories/consumer.repository';

export class PrismaConsumerRepository implements ConsumerRepository {
  constructor(private prismaService: PrismaService ) {}

  public async findById(id: string): Promise<Consumer> {
    return this.prismaService.consumer.findUnique({
      where: {
        id
      }
    });
  }
}