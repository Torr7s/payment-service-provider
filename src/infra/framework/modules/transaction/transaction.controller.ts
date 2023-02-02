import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthUser } from '../auth/decorators/auth-user.decorator';

import { SessionAuthGuard } from '../auth/guards/session-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateTransactionUseCase } from '@/app/use-cases/transactions/create-transaction';
import { ListUserTransactionsUseCase } from '@/app/use-cases/transactions/list-user-transactions';

import { CreateTransactionDto } from '@/domain/dtos/transaction/create-transaction.dto';

import { UserEntity } from '@/domain/entities/user.entity';
import { TransactionEntity } from '@/domain/entities/transaction.entity';

@Controller('transactions')
@UseGuards(SessionAuthGuard, JwtAuthGuard)
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly listUserTransactionsUseCase: ListUserTransactionsUseCase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @AuthUser() user: UserEntity,
    @Body() createTransactionDto: CreateTransactionDto
  ): Promise<{ transaction: TransactionEntity }> {
    return this.createTransactionUseCase.exec({
      ...createTransactionDto,
      userId: user.id
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async list(@AuthUser() user: UserEntity): Promise<{ transactions: TransactionEntity[] }> {
    return this.listUserTransactionsUseCase.exec({ userId: user.id });
  }
}