export function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

export function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

export function stripTemplate(content) {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}
export function isPlainObject (val) {
  return toString.call(val) === '[object Object]'
}
const DEFAULT_OMIT = [undefined, null, '']
export function filterObject (val, omit = DEFAULT_OMIT) {
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
