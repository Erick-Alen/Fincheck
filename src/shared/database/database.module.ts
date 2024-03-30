import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { CategoriesRepository } from './repositories/categories.repository';
import { BankAccountsRepository } from './repositories/bank-accounts.repository';
import { TransactionsRepository } from './repositories/transactions.repository';

//module marked as global is visible to all modules in the application
@Global()
@Module({
  providers: [UsersRepository, PrismaService, CategoriesRepository, BankAccountsRepository, TransactionsRepository],
  //module providers are ALWAYS PRIVATE, so we need to export users repo
  exports:[UsersRepository, CategoriesRepository, BankAccountsRepository, TransactionsRepository]
})

export class DatabaseModule {}
