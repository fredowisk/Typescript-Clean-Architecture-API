interface HashComparer {
  compare: (value: string, hash: string) => Promise<boolean>
}

export { HashComparer }
