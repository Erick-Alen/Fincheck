import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../categories/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import { filter } from 'rxjs';
import { TransactionType } from './entities/Transaction';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService
  ) { }
  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, name, value, type, date } = createTransactionDto
    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId })
    return this.transactionsRepo.create({
      data: {
        userId, bankAccountId, categoryId, name, value, type, date
      }
    })
  }

  findAllByUserId(userId: string, filters: { month: number, year: number, bankAccountId?: string, type: TransactionType }) {

    return this.transactionsRepo.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1))
        }
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          }
        }
      }
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} transaction`;
  // }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } = updateTransactionDto
    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId, transactionId })
    return this.transactionsRepo.update({
      where: {
        id: transactionId
      },
      data: {
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      }
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({transactionId, userId})
    return this.transactionsRepo.delete({
      where: {
        id: transactionId
      }
    });
    return null
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId
  }: { userId: string, bankAccountId?: string, categoryId?: string, transactionId?: string }) {
    await Promise.all([
      transactionId && this.validateTransactionOwnershipService.validate(userId, transactionId),
      bankAccountId && this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      categoryId && this.validateCategoryOwnershipService.validate(userId, categoryId)
    ])
  }
}
