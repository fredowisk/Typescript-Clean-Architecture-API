import { AccountModel } from '@/domain/models/account/account'

interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel>
}

export { LoadAccountByEmailRepository }
