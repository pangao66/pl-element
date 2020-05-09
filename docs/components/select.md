---
title: select
sidebarDepth: 2
---

## 基础用法
该组件需配合`el-form`使用
::: tip
基于`el-select`做了一些增强:
-  `clearable`, `filterable`, `defaultFirstOption`这三个属性修改为默认为true
-  options属性支持传入数组和对象,传入数组时,可同步传入`optionsAttr`属性,该属性为一个字符串用逗号分隔,为label,key的别名,传入对象时则传入简单key-value结构

:::

<demo-block>
<select-demo-01 slot="source"></select-demo-01>

<<< docs/.vuepress/components/select-demo-01.vue

</demo-block>

## 校验

内置必填校验

<demo-block>
<select-demo-02 slot="source"></select-demo-02>
可传入`required`属性校验必填,如需其他形式校验,可给`el-form`组件传递相关`rules`属性

<<< docs/.vuepress/components/select-demo-02.vue

</demo-block>

## 多选

<demo-block>
<select-demo-03 slot="source"></select-demo-03>


<<< docs/.vuepress/components/select-demo-03.vue

</demo-block>

## 绑定对象

<demo-block>
<select-demo-04 slot="source"></select-demo-04>


<<< docs/.vuepress/components/select-demo-04.vue

</demo-block>
