import { Prisma, PaymentMethod } from '@prisma/client';
import { 
  IsDateString, 
  IsDecimal, 
  IsNotEmpty, 
  IsString, 
  MaxLength,
  MinLength 
} from 'class-validator';

export class CreateTransactionDto {
  @IsDecimal()
  @IsNotEmpty()
  value: string | Prisma.Decimal;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
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
}