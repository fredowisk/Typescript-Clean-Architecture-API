import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'
import { Collection, ObjectId } from 'mongodb'
import { mockAddAccountParams } from './mock-account'

const mockAccessToken = async (
  accountCollection: Collection
): Promise<string> => {
  const newUser = mockAddAccountParams('admin')

  const { insertedId } = await accountCollection.insertOne(newUser)

  const id = new ObjectId(insertedId) as unknown as string

  const token = sign({ id }, env.jwtSecret)

  await accountCollection.updateOne(
    {
      _id: id
    },
    {
      $set: {
        accessToken: token
      }
    }
  )

  return token
}

export { mockAccessToken }
