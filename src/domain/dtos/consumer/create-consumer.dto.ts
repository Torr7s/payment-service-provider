import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateConsumerDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}