import Mock from 'mockjs'
import { addUser, deleteUser, getBaseTable, getPageList, getSearchList, updateUser } from './methods'

Mock.mock('/base-table', 'post', getBaseTable)
Mock.mock('/page-table', 'post', getPageList)
Mock.mock('/search-table', 'post', getSearchList)
Mock.mock('/delete-user', 'post', deleteUser)
Mock.mock('/update-user', 'post', updateUser)
Mock.mock('/add-user', 'post', addUser)
export default Mock
