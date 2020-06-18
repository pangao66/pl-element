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
