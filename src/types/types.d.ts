interface Menu {
  key: string
  label: string
  children: undefined | Array<Menu>
}

type CodeblockMode = 'codesandbox' | 'preview'
