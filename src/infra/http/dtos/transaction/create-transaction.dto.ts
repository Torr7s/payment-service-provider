import { 
  IsDateString, 
  IsDecimal, 
  IsNotEmpty, 
  IsString, 
  MaxLength,
  MinLength 
} from 'class-validator';

import { PaymentMethod } from '@/src/types';

export class CreateTransactionDto {
  @IsDecimal()
  @IsNotEmpty()
  value: string;

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