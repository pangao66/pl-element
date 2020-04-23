export function getRandomKey () {
  let list = []
  for (let i = 0; i < 5; i++) {
    list.push(Math.ceil(Math.random() * 10000))
  }
  return list.join('-')
}
