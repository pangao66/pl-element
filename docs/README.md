### 前言

服务于中后台产品的设计体系,基于确定和自然的设计价值观上的模块化解决方案,让设计者和开发者专注于更好的用户体验

### 特点

- 模仿antd pro的交互方式
- 打造开箱即用的高质量Vue组件
- 兼容组件中台开发需求
- 该组件是基于element ui的二次封装,通用组件请参考其官方文档
- 基于业务需求统一风格制定的业务组件

### 目的

围绕后台系统常见的 表单,搜索,分页查询,弹窗等业务,解决重复性逻辑,冗余,复用组件等开发问题,将业务层与组件层分离,交互逻辑单一封装,来保证代码风格统一,提高可读性,维护性,覆盖率,减少bug率

## 为什么要二次封装

- 有些问题我们需要经常处理,比如el-date组件,选择范围的时候,返回的是一个数组,而后端经常是需要两个字段,我们需要经常在调用接口的时候将数组转化成两个字段,同时还要处理空值等
- element有些默认属性产品不是产品经理想要的,比如el-table的border,stripe等,产品经理可能想默认就是要带有竖线边框,隔行变色的效果;下拉框产品想默认有clearable清空属性,我们当然可以每个都配置,但经常会遗漏,造成这种细节bug太多

- button经常需要处理重复点击问题,稍不留神就是一个bug
- form表单项太多,模板要写一大堆,又能以分成组件,大量重复代码
## 设计

仿照antd pro的方式, 弄成json配置式的form,table,将分页,查询功能统一封装在一个组件,对外暴露@get-table-data方法供业务组件调用ajax,然后塞入数据 form组件使用动态渲染
内部使用component :is动态组件渲染, 如传入`comp :'input'`则会渲染成 `el-input`组件,传入`comp:'select'`则会渲染成 `el-select`组件, 表单项结构,如不能直接用一个组件渲染出来,可传入`slotName`,在模板中写相应的插槽模板代码即可

```js
const formItems = [
  {comp: 'input', label: '活动名称', prop: 'name'},
  {
    comp: 'selet',
    label: '活动区域',
    prop: 'region',
    options: [{label: '区域一', value: 'shanghai'}, {label: '区域二', value: "beijing"}]
  },
  {label: '活动时间', slotName: 'activityTime'},
  {comp: "switch", label: '即时配送', prop: 'delivery'},
  {comp: "checkbox", label: '活动性质', prop: 'type', options: ['美食/餐厅线上活动', '地推活动', '线下主题活动', '单纯品牌曝光']},
  {comp: 'input', label: '活动形式', prop: 'desc', attrs: {type: 'textarea'}}
]
```



