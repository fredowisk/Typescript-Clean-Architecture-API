interface Decrypter {
  decrypt: (value: string) => Promise<string>
}

export { Decrypter }
