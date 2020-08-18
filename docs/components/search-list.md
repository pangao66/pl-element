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
