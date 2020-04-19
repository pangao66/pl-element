---
title: p-table
lang: zh-cn
---

<<< docs/.vuepress/components/base-table.vue

上述代码展示了基本的表格p-table组件的简单展示使用,由于数据为mock数据,当你正在阅读此文档时,你可以打开控制台,有输出模拟的数据结构.
此示例为`p-table`组件
#### 属性
| 属性| 说明|类型|默认值 |
| --- |:-----:| -----:| -----:
| tableData | 数据源,跟`el-table`的`data`属性相同 | 数组|-
| columns  | 列| 数组|-
其他
#### columns属性
| 属性| 说明|类型|默认值 |
| --- |:-----:| -----:| -----:
| label |  等同于`el-table-column`的`label`| string|-
| prop  | 等同于`el-table-column`的`prop`| string|-
| formatter  | 格式化方法,内置方法见下面详解| string/object/function| 
|attrs|其他属性,可用`el-table-column`的任何属性|对象|-|
|slot| 插槽名称|string|-|
##### formatter详解
- 默认不传的时候会过滤空值,返回 - 横杠
- 直接传入字符串 `date`,返回'yyyy-MM-dd'格式
- 直接传入字符串`time`,返回'yyyy-MM-dd HH:mm:ss'格式
- 直接传入字符串`rmb`,用于后端返回的金额是分为单位,格式化为元
- 直接传入字符串`point2`,用于格式化数字为两位小数
- 直接传入字符串`money`,用于格式化金额为三位分割加逗号
- 可传入对象,仅用于格式化时间,如:`{type:'date',content:'yyyy年MM月dd日 HH时mm分ss秒'}`,type:'date'写死
- 可传入函数,会传入`{row, column, cellValue, index}`对象
::: tip 提示
其他的属性和事件都与`el-table`保持一致,如上例的`dbl-click`事件和`stripe`属性
:::
