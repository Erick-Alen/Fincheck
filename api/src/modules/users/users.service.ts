import { UsersRepository } from './../../shared/database/repositories/users.repositories';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { hash } from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

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

    // const category = await this.usersRepo.category.createMany({
    //   data: [
    //     // Income
    //     { name: 'Salário', icon: 'salary', type: 'INCOME' },
    //     { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
    //     { name: 'Outro', icon: 'other', type: 'INCOME' },
    //     // OUTCOME
    //     { name: 'Casa', icon: 'home', type: 'OUTCOME' },
    //     { name: 'Alimentação', icon: 'food', type: 'OUTCOME' },
    //     { name: 'Educação', icon: 'education', type: 'OUTCOME' },
    //     { name: 'Lazer', icon: 'fun', type: 'OUTCOME' },
    //     { name: 'Mercado', icon: 'grocery', type: 'OUTCOME' },
    //     { name: 'Roupas', icon: 'clothes', type: 'OUTCOME' },
    //     { name: 'Transporte', icon: 'transport', type: 'OUTCOME' },
    //     { name: 'Viagem', icon: 'travel', type: 'OUTCOME' },
    //     { name: 'Outro', icon: 'other', type: 'OUTCOME' },
    //   ],
    // })

    return {
      name: user.name,
      email: user.email,
    };
  }

  //role based access control disabled
  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
