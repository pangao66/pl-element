/**
 * 获取随机key
 * @param len
 * @param type
 * @returns {string}
 */
export function getRandomKey(len = 5, type = 'number') {
  const list = []
  for (let i = 0; i < len; i++) {
    const randomNumber = Math.floor(Math.random() * (99999 - 10000)) + 10000
    const item = type === 'str' ? randomNumber.toString(36) : randomNumber
    list.push(item)
  }
  return list.join('-')
}

/**
 * 防抖
 * @param fn
 * @param wait
 * @param isImmediate
 * @returns {function(...[*]=)}
 */
export function debounce(fn, wait = 500, isImmediate = true) {
  let timerId = null
  let flag = true
  if (isImmediate) {
    return function() {
      clearTimeout(timerId)
      if (flag) {
        // eslint-disable-next-line prefer-rest-params
        fn.apply(this, arguments)
        flag = false
      }
      timerId = setTimeout(() => {
        flag = true
      }, wait)
    }
  }
  return function() {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      // eslint-disable-next-line prefer-rest-params
      fn.apply(this, arguments)
    }, wait)
  }
}

/**
 * isArray
 * @param v
 * @returns {any}
 */
export function isArray(v) {
  return typeof Array.isArray === 'function'
    ? Array.isArray(v)
    : Object.prototype.toString.call(v) === '[object Array]'
}

/**
 * 普通对象判断
 * @param val
 * @returns {boolean}
 */
export function isPlainObject(val) {
  return toString.call(val) === '[object Object]'
}

const DEFAULT_OMIT = [undefined, null, '']

export function filterObject(val, omit = DEFAULT_OMIT) {
  if (!isPlainObject(val)) {
    return val
  }
  return Object.keys(val).reduce((obj, key) => {
    const value = val[key]
    if (!omit.includes(value)) {
      if (isPlainObject(value)) {
        obj[key] = filterObject(value)
      } else {
        obj[key] = value
      }
    }
    return obj
  }, {})
}
