import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUserById(userId: string) {
    return { userId };
  }
}
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
