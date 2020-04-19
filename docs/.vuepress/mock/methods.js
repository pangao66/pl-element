import { pagination } from './util'
import Mock from 'mockjs'
import { Random } from 'mockjs'

let List = []
const count = 2000
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    address: Mock.mock('@county(true)'),
    'birth|315504000000-946656000000': 1,
    sex: Mock.Random.integer(0, 1),
    'job|1': ['designer', 'programmer', 'testers', 'product'] // 从字符串数组中随机选择一个数
  }))
}
export const getPageList = (option) => {
  let { body } = option
  body = JSON.parse(body)
  console.log(body)
  const { currentPage, pageSize } = body
  return {
    list: pagination(currentPage, pageSize, List),
    total: List.length
  }
}
export const getBaseTable = () => {
  return pagination(1, 10, List)
}
export const getSearchList = (option) => {
  let { body } = option
  body = JSON.parse(body)
  console.log(body)
  const { currentPage, pageSize, ...query } = body
  let list = [...List]
  for (let i in query) {
    if (!(query[i] === '' || query[i] === 'undefined' || query[i] == null)) {
      list = list.filter((item) => {
        return item[i] === query[i]
      })
    }
  }
  return {
    list: pagination(currentPage, pageSize, list),
    total: list.length
  }
}
export const deleteUser = (option) => {
  let { body } = option
  body = JSON.parse(body)
  console.log(body)
  const { id } = body
  const index = List.findIndex((item) => {
    return item.id === id
  })
  List.splice(index, 1)
  return {
    data: {
      id
    },
    message: '删除用户成功',
    code: 1
  }
}

export const updateUser = (option) => {
  let { body } = option
  body = JSON.parse(body)
  console.log(body)
  const { id } = body
  const index = List.findIndex((item) => {
    return item.id === id
  })
  List.splice(index, 1, body)
  return {
    data: {
      id
    },
    message: '修改用户成功',
    code: 1
  }
}
export const addUser = (option) => {
  let { body } = option
  body = JSON.parse(body)
  console.log(body)
  const id = Mock.Random.guid()
  List.unshift({ ...body, id })
  return {
    data: {
      id
    },
    message: '添加用户成功',
    code: 1
  }
}
