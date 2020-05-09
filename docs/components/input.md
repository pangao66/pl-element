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

## 校验
::: tip
校验支持多种方式,需传入`prop`:
- 可直接在`el-form`上传入`rules`属性,与`el-form`的原生用法一致
- `p-input`传入`rules`属性,与`el-form-item`的`rules`属性用法一致
- `p-input`传入 `required`属性,此时会自动校验必填
- `p-input`传入`validation`属性,此属性为一些内置的正则校验,可传入值见下文说明
:::

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
