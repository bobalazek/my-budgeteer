export const isNumeric = (n: any): boolean => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export const isArrayOfStrings = (array: any): boolean => {
  return array.every((item) => typeof item === 'string')
}

export const isArrayOfLinks = (array: any): boolean => {
  return array.every((item) => {
    if (typeof item !== 'string') {
      return false
    }

    if (!item) {
      return false
    }

    try {
      const url = new URL(item)

      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return false
      }
    } catch {
      return false
    }

    return true
  })
}

export function generateTree<
  T extends {
    id: string
    parentId: string | undefined
    children: T[] | undefined
  }
>(data: T[]) {
  const array = JSON.parse(JSON.stringify(data)) as typeof data
  const tree: T[] = []

  for (let i = 0; i < array.length; i++) {
    const item = array[i]

    if (item.parentId) {
      const parent = array.filter((elem) => elem.id === item.parentId).pop()
      if (!parent) {
        continue
      }

      if (!parent.children) {
        parent.children = []
      }

      parent.children.push(item)
    } else {
      tree.push(item)
    }
  }

  return tree
}
