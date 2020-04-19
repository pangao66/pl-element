### 安装使用
pf-table是一个element-ui组件封装,融合了分页,查询,表格,只需要写一些配置,就能很方便的创建查询表格,从而减少重复逻辑.

### 安装:
```
npm install pf-table --save
```
使用
```js
import pfTable from pf-table
Vue.use(pfTable)
```
pfTable包含以下五个组件
- `p-table`: 简单的`el-table的封装`,示例可见 `基础表格`
- `p-form` : `el-form`的封装,示例可见`综合表格`里面的`edit-user`组件
- `pf-table`:合并了`p-table`/`p-form`和`el-pagination`三个组件,分页查询都内部处理,并自动loading,示例可见 `综合表格`
- `pf-tab-table`:  合并了`p-table`/`p-form`/`el-pagination`和`el-tab`组件,示例可见 `tab表格`
- `p-dialog-form`:`p-form`组件与`el-dialog`组件合并
