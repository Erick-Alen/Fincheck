import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  // @IsString({message: 'Senha precisa ser uma string'})
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
