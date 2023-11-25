import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';

//module marked as global is visible to all modules in the application
@Global()
@Module({
  providers: [UsersRepository, PrismaService],
  //module providers are ALWAYS PRIVATE, so we need to export users repo
  exports:[UsersRepository]
})

export class DatabaseModule {}
