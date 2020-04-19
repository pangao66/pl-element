### tab表格
<ClientOnly>
<tab-table></tab-table>
</ClientOnly>

<<< docs/.vuepress/components/tab-table.vue

在`pf-table`组件基础上添加了tab,tab默认为keep-alive的

### 属性
| 属性名        | 说明           | 类型  |默认值|
| ------------- |:-------------:| -----:|-----:
| tabs     | tab列表 | - |-|
| tabConfig     | tab配置,`el-tabs`的属性 | - |-|
| tabChangeGetData     | 是否取消keep-alive,切换tab每次都重新获取数据 | - |-|

其他的属性与`pf-table`相同
#### tabs配置
| 属性名        | 说明           | 类型  |默认值|
| ------------- |:-------------:| -----:|-----:
| name     | 相对于`el-tab-pane`的name| - |-|
| label     | 相对于`el-tab-pane`的label| - |-|
| columns     | 如果每个tab的列不一样,可自定列,与`t-table的columns`一样| - |-|
