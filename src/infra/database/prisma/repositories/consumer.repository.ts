import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

import { ConsumerRepository } from '@/app/repositories';

import { ConsumerRepositoryCreateNS, ConsumerRepositoryFindByEmailNS, ConsumerRepositoryFindByIdNS } from '@/domain/contracts/repositories';

@Injectable()
export class PrismaConsumerRepository implements ConsumerRepository {
  constructor(private prismaService: PrismaService ) {}

  public async create(params: ConsumerRepositoryCreateNS.Input): Promise<ConsumerRepositoryCreateNS.Output> {
    return this.prismaService.consumer.create({
      data: {
        email: params.email,
        fullName: params.fullName
      }
    });
  } 

  public async findByEmail({ email }: ConsumerRepositoryFindByEmailNS.Input): Promise<ConsumerRepositoryFindByEmailNS.Output> {
    return this.prismaService.consumer.findUnique({
      where: {
        email
      }
    });
  }

  public async findById({ id }: ConsumerRepositoryFindByIdNS.Input): Promise<ConsumerRepositoryFindByIdNS.Output> {
    return this.prismaService.consumer.findUnique({
      where: {
        id
      }
    });
  }
}