import { getRandomKey } from './index'

const Item2UIDMap = new WeakMap()
window.Item2UIDMap = Item2UIDMap
// let uid = 0

// 获取列表key 使用WeakMap
export function getItemKey(item) {
  if (!Item2UIDMap.has(item)) {
    Item2UIDMap.set(item, getRandomKey())
  }
  return Item2UIDMap.get(item)
}
