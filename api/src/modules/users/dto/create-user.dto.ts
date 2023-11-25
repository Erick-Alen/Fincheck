import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  //ordem dos pipes não tem importância
  @IsString()
  @IsNotEmpty()
  name: string;

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
