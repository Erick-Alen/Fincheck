import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService
  ) { }
  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto;
    return this.bankAccountsRepo.create({
      data: {
        userId,
        name,
        initialBalance,
        color,
        type,
      }
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findMany({
      where: {
        userId
      },
      include: {
        // user: true,
        transactions: {
          select: {
            type: true,
            value: true
          }
        }
      }
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce((acc, transaction) => (
        transaction.type === 'INCOME' ? acc + transaction.value : acc - transaction.value
      ), 0)

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return  {
          ...bankAccount,
          currentBalance,
          // transactions
        }
      })
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} bankAccount`;
  // }

  async update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId)


    const { color, initialBalance, name, type } = updateBankAccountDto;

    return this.bankAccountsRepo.update({
      where: {
        id: bankAccountId
      },
      data: {
        color,
        initialBalance,
        name,
        type
      }
    })
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId)


    await this.bankAccountsRepo.delete({
      where: {
        id: bankAccountId
      }
    });
  }


}
