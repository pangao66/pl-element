/**
 * 获取随机key
 * @param len
 * @param type
 * @returns {string}
 */
export function getRandomKey (len = 5, type = 'number') {
  let list = []
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
export function debounce (fn, wait = 500, isImmediate = true) {
  let timerId = null
  let flag = true
  if (isImmediate) {
    return function () {
      clearTimeout(timerId)
      if (flag) {
        fn.apply(this, arguments)
        flag = false
      }
      timerId = setTimeout(() => { flag = true}, wait)
    }
  }
  return function () {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}

/**
 * isArray
 * @param v
 * @returns {any}
 */
export function isArray (v) {
  return typeof Array.isArray === 'function' ? Array.isArray(v) : Object.prototype.toString.call(v) === '[object Array]'
}

/**
 * 普通对象判断
 * @param val
 * @returns {boolean}
 */
export function isPlainObject (val) {
  return toString.call(val) === '[object Object]'
}

// 批量处理对象属性空格, clear表示清除无效属性，默认true
export function filterNullValue (data, filterNullString = true, filterNullValue = true) {
  if (!isPlainObject(data)) {
    return data
  }
  const newParams = {}
  const allParams = data
  for (const item of Object.keys(allParams)) {
    const check = Object.prototype.toString.call(allParams[item])
    // 为空
    if (!(check === '[object Null]' || check === '[object Undefined]')) {
      if (!(filterNullString && allParams[item] === '')) {
        newParams[item] = allParams[item]
      }
    } else {
      if (!filterNullValue) {
        newParams[item] = allParams[item]
      }
    }
  }
  return newParams
}
