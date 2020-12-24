const Item2UIDMap = new WeakMap()

/**
 * 获取随机key
 * @param len
 * @param type
 * @returns {string}
 */
export function getRandomKey (len = 5, type = 'number') {
  const list = []
  for (let i = 0; i < len; i++) {
    const randomNumber = Math.floor(Math.random() * (99999 - 10000)) + 10000
    const item = type === 'str' ? randomNumber.toString(36) : randomNumber
    list.push(item)
  }
  return list.join('-')
}

export function getItemKey (item) {
  const persistedUID = Item2UIDMap.get(item)
  if (!persistedUID) {
    Item2UIDMap.set(item, getItemKey())
    return persistedUID
  }
  return persistedUID
}
