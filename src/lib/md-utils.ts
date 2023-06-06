export function getChildrenId(children: any[]) {
  let text = ''
  for (const n of children) {
    if (n.children) {
      text = text + getChildrenId(n.children)
    } else {
      text = text + n.value
    }
  }
  return text.replaceAll(' ', '')
}
