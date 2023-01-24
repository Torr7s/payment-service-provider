import { PrismaService } from '../prisma.service';

import { ConsumerRepository } from '@/app/abstracts/repositories';

import { 
  NSConsumerRepositoryCreate, 
  NSConsumerRepositoryFindByEmail, 
  NSConsumerRepositoryFindById 
} from '@/domain/contracts/repositories';

export class PrismaConsumerRepository implements ConsumerRepository {
  constructor(private prismaService: PrismaService ) {}

  public async create(params: NSConsumerRepositoryCreate.Input): Promise<NSConsumerRepositoryCreate.Output> {
    return this.prismaService.consumer.create({
      data: {
        email: params.email,
        fullName: params.fullName,
        password: params.password
      }
    });
  } 

  public async findByEmail({ email }: NSConsumerRepositoryFindByEmail.Input): Promise<NSConsumerRepositoryFindByEmail.Output> {
    return this.prismaService.consumer.findUnique({
      where: {
        email
      }
    });
  }

  public async findById({ id }: NSConsumerRepositoryFindById.Input): Promise<NSConsumerRepositoryFindById.Output> {
    return this.prismaService.consumer.findUnique({
      where: {
        id
      }
    });
  }
}