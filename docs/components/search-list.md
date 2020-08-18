---
title: search-list
sidebarDepth: 2
---

## 查询列表

<demo-block>

<search-list-demo-01 slot="source"></search-list-demo-01>


<<< docs/.vuepress/components/search-list-demo-01.vue


</demo-block>

::: tip 提示
`pl-search-list`由`el-form`,`el-table`,`el-pagnation`三个组件组合而成,使得写业务的时候告别重复的查询表格,直接配置相关的项即可.对于不能使用简单的字段描述的表格项和表单项,可配置slotName,在模板中使用slot则可以写出任意组合的组件了,如本例中,form中的`测试slot`项,table中`姓名`一列,使用的slot.
:::

### 特色功能
- 表单查询项使用响应式布局,目前内置4个响应点:

| x>=1900| 1200<=x<1900 | 992<=x<1200 |  x<992 |
|----| ----| ----| ---- | 
|四列 | 三列 | 两列 | 一列 | 
- 表单查询项添加收起展开功能,体验友好
- 自动高度,在全屏条件下,可设置各种分页模式,均为table内部滚动条,固定了表头
- 查询分页等功能大大简化
- 内置序号列,自动根据分页设置序号列
::: warning 警告
此例由于用到mock数据,受限于codepen单html模式,此例在线运行功能不可用,请点击全屏展示按钮查看效果
:::
