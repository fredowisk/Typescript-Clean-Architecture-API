import { AccountModel } from '@/domain/models/account/account'

interface LoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<AccountModel>
}

export { LoadAccountByToken }
