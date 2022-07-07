import { AccountModel } from '@/domain/models/account'

interface LoadAccountByTokenRepository {
  load: (token: string) => Promise<AccountModel>
}

export { LoadAccountByTokenRepository }
