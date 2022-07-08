import { AccountModel } from '@/domain/models/account'

interface LoadAccountByTokenRepository {
  loadByToken: (accessToken: string, role?: string) => Promise<AccountModel>
}

export { LoadAccountByTokenRepository }
