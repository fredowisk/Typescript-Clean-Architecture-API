import { sign } from "jsonwebtoken";
import env from "@/main/config/env";
import { Collection, ObjectId } from "mongodb";
import { mockAddAccountParams } from "./mock-account";

const mockAccessToken = async (
  accountCollection: Collection
): Promise<string> => {
  const newUser = mockAddAccountParams("admin");

  const { insertedId } = await accountCollection.insertOne(newUser);

  const id = insertedId.toHexString();

  const accessToken = sign({ id }, env.jwtSecret);

  await accountCollection.updateOne(
    {
      _id: insertedId,
    },
    {
      $set: {
        accessToken
      },
    }
  );

  return accessToken;
};

export { mockAccessToken };
