---
title: form
sidebarDepth: 2
---

## 基础展示
::: tip  
此示例展示了`pl-form`的基础使用,基于配置式,代码量大大减少,同时表单校验也简单了许多,在配置比较繁琐不如模板清晰的时候,可使用slot用模板编写.如demo中活动时间这个表单项,此例还同时展示了表单校验的基础使用,对应仅做必填校验的项,直接给对应的表单项添加required属性即可
:::

 
<demo-block>

<form-demo-01 slot="source"></form-demo-01>

<<< docs/.vuepress/components/form-demo-01.vue

</demo-block>


## 栅格布局

<demo-block>

<form-demo-02 slot="source"></form-demo-02>

<<< docs/.vuepress/components/form-demo-02.vue

</demo-block>

## 自定义校验

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

<demo-block>

<form-demo-03 slot="source"></form-demo-03>


<<< docs/.vuepress/components/form-demo-03.vue


</demo-block>


form组件是对`el-form`的二次封装, 内置表单校验,将表单项弄成json配置式数组格式
el-form的所有属性都可以直接继承
## Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value/v-model | 表单值 | object   | — | - |
| form-items | 表单项 | array   | — | [] |


## formItems
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| label    | el-form-item的label | string    | — | - |
| prop | el-form-item的prop | string   | — | - |
| comp | 需要渲染成的组件 | string   | — | - |
| options | 当comp为select/checkbox/radio的时候此属性有效 | array   | — | - |
| required | 表单校验的必填属性 | boolean   | — | - |
| rules | 表单项的rules属性,和required等校验项会合并 | array/object   | — | - |
| attrs | 表单项的其他属性(对应element组件的props选项) | -   | — | - |

## Events
| 事件名 | 描述 | 参数 |
|----| ----| ----|
| confirm | 点击了提交按钮通过表单校验后会触发,val为form内容 | (fn:val) |
