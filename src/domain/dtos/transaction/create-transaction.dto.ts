import { Prisma, PaymentMethod } from '@prisma/client';
import { 
  IsDateString, 
  IsDecimal, 
  IsNotEmpty, 
  IsString, 
  IsUUID, 
  MaxLength,
  MinLength 
} from 'class-validator';

import { CheckPaymentMethod } from '@/core/@decorators';

export class CreateTransactionDto {
  @IsDecimal()
  @IsString()
  @IsNotEmpty()
  value: string | Prisma.Decimal;

  @IsString()
  @IsNotEmpty()
  description: string;
  
  @CheckPaymentMethod(PaymentMethod, { each: true })
  @IsNotEmpty()
  paymentMethod: PaymentMethod;
  
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  @IsNotEmpty()
  cardNumber: string;
  
  @IsString()
  @IsNotEmpty()
  cardOwnerName: string;
  
  @IsDateString()
  @IsNotEmpty()
  cardExpirationDate: string | Date;
  
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  @IsNotEmpty()
  cardCVV: string;

  @IsUUID()
  consumerId: string;
}