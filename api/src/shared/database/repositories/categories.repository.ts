import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) { }

  //uncomment this line eto crate more categories for each user
  // create(createDto: Prisma.UserCreateArgs) {
  //   return this.prismaService.user.create(createDto)
  // }

  findMany(findManyDto: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany(findManyDto)
  }
}
