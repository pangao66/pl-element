---
title: table表格
sidebarDepth: 2
---

::: tip
表格是开发后台管理系统中非常常用的组件,`elementUI`的`el-table`组件功能强大,但在实际使用中,我们直接使用会写很多重复代码,本组件通过封装`el-table`组件,使得写表格配置化,大量减少重复代码,扩展性强,而且不影响`el-table`的任何属性的使用,事件和属性均可直接继承使用.主要特点如下:
- 优化了一些`el-table`默认属性,如`border`,`stripe`,`highlight-current-row`,`show-overflow-tooltip`均改为默认为`true`
- 使用`columns`属性替代重复的`el-table-columns`
- 默认添加单元格双击复制
- 内置一些常用的格式化函数
- 单元格没有内容默认展示`-` 短横杠
:::


## 基础表格
基础的表格展示用法。

<demo-block>
<table-demo-01 slot="source"></table-demo-01>
`pl-table`基于`el-table`,`data`属性保持不变, 新增`columns`属性以替换重复的`el-table-column`,columns的每一项属性有两个必要值`label`和`prop`与`el-table-column`的`label`和`value`保持一致.而`el-table-column`的所有属性均可有`columns`的每一项中的`attrs`属性继承,如上例中`attrs`中的`width`属性。

<<< docs/.vuepress/components/table-demo-01.vue
</demo-block>

## 自定义列模板
自定义列的显示内容，可组合其他组件使用。

<demo-block>
<table-demo-02 slot="source"></table-demo-02>
如简单的`prop`不能满足渲染表格,可设置`columns`该列的`slot`属性,`slot`为一个字符串,然后就可以在模板中写相关的自定义内容,写法与`el-table`的写法类似,本例采用了`vue2.6`的`v-slot`插槽语法。

<<< docs/.vuepress/components/table-demo-02.vue
</demo-block>

## 格式化内容
`pl-table`组件内置一些常用的格式化工具,增强了`el-table`自带的`formatter`功能,只需给`columns`该项传递`formatter`属性即可
::: tip
- 空数据单元格显示'-' 短横杠
- `formatter`属性可以传递一个函数,这时与`el-table-column`的`formatter`基本一致,只是返回值多个参数形式变成了对象解构形式
- 内置了日期格式化,可传递`formatter`为`date`返回`yyyy-MM-dd`,传`datetime`返回`yyyy-MM-dd HH:mm:ss`,传`time`返回`    HH:mm:ss`,另可自定义格式,传递对象如:`{type:'data',content:'yyyy年MM月dd日 HH时mm分ss秒'}`,注意:`type`必须指定为`date`
- `formatter`属性可传递一个对象,用于数据字典对象形式格式化,如:`{type:'dict',dict:{1:'男',0:'女'}}`
- 单元格没有内容默认展示`-` 短横杠
:::
<demo-block>
<table-demo-03 slot="source"></table-demo-03>

<<< docs/.vuepress/components/table-demo-03.vue
</demo-block>

## 综合演示

<demo-block>
<table-demo-04 slot="source"></table-demo-04>

<<< docs/.vuepress/components/table-demo-04.vue

</demo-block>


