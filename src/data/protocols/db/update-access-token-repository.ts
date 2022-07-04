interface UpdateAccessTokenRepository {
  update: (token: string, id: string) => Promise<void>
}

export { UpdateAccessTokenRepository }
