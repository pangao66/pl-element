---
title: input
sidebarDepth: 2
---

## 基础用法

<demo-block>
<input-demo-01 slot="source"></input-demo-01>
<<< docs/.vuepress/components/input-demo-01.vue

支持`el-input`的其他任何属性

</demo-block>

## icon

与 `el-input` 一致

<demo-block>

<input-demo-02 slot="source"></input-demo-02>

<<< docs/.vuepress/components/input-demo-02.vue

</demo-block>


## 金额输入
后端一般传入前端的值为分 前端需做一些金钱转换传给后端分为单位

<demo-block>
<input-demo-03 slot="source"></input-demo-03>
<<< docs/.vuepress/components/input-demo-03.vue
</demo-block>

## textarea

与`el-input`渲染textarea一致,添加`type`属性即可

<demo-block>
<input-demo-04 slot="source"></input-demo-04>

<<< docs/.vuepress/components/input-demo-04.vue

</demo-block>

## 复合型输入框

与 `el-input` 一致

<demo-block>
<input-demo-05 slot="source"></input-demo-05>

<<< docs/.vuepress/components/input-demo-05.vue

</demo-block>

## 值转化

有时会需要需要转化输入值的情况,比如用户输入小写,将其转化为大写.此例展示了将用户输入转化成大写,配置`tranfer`属性即可

<demo-block>
<input-demo-06 slot="source"></input-demo-06>

<<< docs/.vuepress/components/input-demo-06.vue

</demo-block>

除以上列出的demo外,其他`el-input`支持的属性均保持一致

## Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| cent    |金额输入元,返回分 | boolean    | — | false |
| transfer | 值转化| function(val)    | — | - |
