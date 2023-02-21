import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthUser } from '../core/auth/decorators/auth-user.decorator';

import { SessionAuthGuard } from '../core/auth/guards/session-auth.guard';
import { JwtAuthGuard } from '../core/auth/guards/jwt-auth.guard';

import { CreateTransactionUseCase } from '@/app/use-cases/transactions/create-transaction';
import { ListUserTransactionsUseCase } from '@/app/use-cases/transactions/list-user-transactions';

import { CreateTransactionDto } from '@/infra/http/dtos/transaction/create-transaction.dto';

import { UserEntity } from '@/app/entities/user.entity';
import { TransactionEntity } from '@/app/entities/transaction.entity';

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