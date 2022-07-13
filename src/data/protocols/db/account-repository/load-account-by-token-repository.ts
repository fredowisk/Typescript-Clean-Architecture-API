import { AccountModel } from '@/domain/models/account/account'

interface LoadAccountByTokenRepository {
  loadByToken: (accessToken: string, role?: string) => Promise<AccountModel>
}

export { LoadAccountByTokenRepository }
