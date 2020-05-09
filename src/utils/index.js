export function getRandomKey (len = 5, type = 'number') {
  let list = []
  for (let i = 0; i < len; i++) {
    const randomNumber = Math.floor(Math.random() * (99999-10000)) + 10000
    const item = type === 'str' ? randomNumber.toString(36) : randomNumber
    list.push(item)
  }
  return list.join('-')
}

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

export function isArray (v) {
  return typeof Array.isArray === 'function' ? Array.isArray(v) : Object.prototype.toString.call(v) === '[object Array]'
}

export function isPlainObject (val) {
  return toString.call(val) === '[object Object]'
}
