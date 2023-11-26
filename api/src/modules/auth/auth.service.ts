import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs'
import { SignUpDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepo: UsersRepository, private readonly jwtService: JwtService) { }

  async signin(signInDto: SigninDto) {
    const { email, password } = signInDto;
    const user = await this.usersRepo.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials')
    }
    const matchPassword = await compare(password, user.password)
    if (!matchPassword) {
      throw new UnauthorizedException('Invalid Credentials')
    }
    const accessToken = await this.jwtService.signAsync({sub:user.id})
    return {accessToken}
  }


  async signup(signUpDto: SignUpDto) {
    const { email, name, password } = signUpDto;
    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true }
    })
    if (emailTaken) {
      throw new ConflictException('Email already in use')
    }
    const hashedPassword = await hash(password, 12)
    const user = await this.usersRepo.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
            // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
            // Outcome
              { name: 'Casa', icon: 'home', type: 'OUTCOME' },
              { name: 'Alimentação', icon: 'food', type: 'OUTCOME' },
              { name: 'Educação', icon: 'education', type: 'OUTCOME' },
              { name: 'Lazer', icon: 'fun', type: 'OUTCOME' },
              { name: 'Mercado', icon: 'grocery', type: 'OUTCOME' },
              { name: 'Roupas', icon: 'clothes', type: 'OUTCOME' },
              { name: 'Transporte', icon: 'transport', type: 'OUTCOME' },
              { name: 'Viagem', icon: 'travel', type: 'OUTCOME' },
              { name: 'Outro', icon: 'other', type: 'OUTCOME' },
            ]
          }
        }
      }
    })

    const accessToken = await this.generateAccessToken(user.id)
    return { accessToken }

  }

  private generateAccessToken(userId: string/*, roles: string*/) {
    return this.jwtService.signAsync({sub: userId})
  }

}
