import { AccountModel } from '@/domain/models/account'

interface LoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<AccountModel>
}

export { LoadAccountByToken }
