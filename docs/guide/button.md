---
title: button                  
sidebarDepth: 2
---
## 防抖

禁止用户频繁点击，多用于频繁点击操作，500ms之内重复点击只会执行一次

<demo-block>
<button-demo-01 slot="source"></button-demo-01>

<<< docs/.vuepress/components/button-demo-01.vue

</demo-block>

## 自动loading

自动添加loading效果,方便点击处理事件,会通过参数 done 函数待 ajax等返回后控制loading关闭

<demo-block>
<button-demo-02 slot="source"></button-demo-02>

<<< docs/.vuepress/components/button-demo-02.vue

</demo-block>

## tip button

`pl-tip-button`用于给按钮添加tip说明,包含`pl-button`的所有功能

<demo-block>
<button-demo-04 slot="source"></button-demo-04>

<<< docs/.vuepress/components/button-demo-04.vue

</demo-block>

## 操作确认
有时候我们点击按钮需弹窗确认后方可继续,`pl-button`封装了这个步骤

<demo-block>
<button-demo-03 slot="source"></button-demo-03>

<<< docs/.vuepress/components/button-demo-03.vue

</demo-block>

## Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| debounce    | 是否启用防抖 | boolean    | — | false |
| loading | 点击后自动开启loading(按钮上) | boolean | — | false |
| fullscreenLoading | 点击后自动开启loading(全屏) | boolean |       —       | false |
| confirmType | 操作按钮确认方式,可自动渲染`el-popconfirm`或`element-ui`的`confirm`弹窗 | pop/confirm | — | — |
| popConfig | 当传入confirmType为pop时,`el-popconfirm`属性的对象,可传入`el-popconfirm`组件支持的所有属性值           | object  | — | — |
| confirmConfig      | 当传入confirmType为confirm时,`element-ui`的`Messagebox.confirm`的属性值对象            | —  | — | —   |
::: tip  温馨提示
除以上列出的为本组件封装的新属性,其他`el-input`的任何属性均可直接继承
::: 
## Events
| 事件名 | 描述 | 参数 |
|----| ----| ----|
| click | 点击事件,如使用了loading,可用回调函数done来清除loading  | (fn:done) |
| confirm | 当传入confirmType的时候,操作按钮确认事件  | (fn:done) |

