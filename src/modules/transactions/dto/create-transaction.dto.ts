import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';
import { TransactionType } from '../entities/Transaction';

export class CreateTransactionDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  bankAccountId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;
}
