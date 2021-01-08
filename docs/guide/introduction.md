# 介绍

`pl-element`是一套基于`element-ui`的二次封装组件库,它使用了最新的前端技术栈,在基于`element-ui`的原有功能上,提供大量扩展,大大简化代码,对于后台系统常用的查询表格等都封装成了组件, 实现配置式页面.
::: tip 建议
本项目定位是一个组件库,对现有项目无干扰,你可以直接将其用在基于`vue`和`element-ui`的后台项目中. 如果你需要集成方案,本项目也提供了基于`vue-element-admin`的全套方案
:::
# 功能
- button
  - 防抖功能
  - 自动loading/全屏loading功能
  - confirm功能(提供messageBox式和Popconfirm式)
  - tip文案
  
- input
  - 提供转化,如:输入小写自动转化成大写
  - 金额转化,输入元,返回分
- select
  - options属性支持传入数组和对象,无需自己手动映射成label和value
- date-picker
  - 简化快捷选项,如 绑定:shortcuts="['recentWeek', 'recentMonth', 'recentThreeMonth']" 就能实现 [最近一周,最近一月,最近三月]的快捷选项,比`el-date-picker`简化很多
  - 添加between属性, 如:日期范围经常需要跨度不能超过一个月这样的需求,只需设置between=30 即可实现
  - disable-date 简化, 如:经常有日期只能选择今天之后的日期或今天之前的日期,只需传入'beforeToday'或'afterToday'
- form 
  - 提供配置式的表单项
  - 内置表单校验操作
  - 简化表单校验写法,内置常用校验正则
- table
  - 提供配置式column
  - 内置一些常用的格式化
  - 枚举code转中文并通过`el-tag`显示
  - 提供虚拟滚动,满足大数据场景
- search-list/tab-search-list
  - 将表单/表格/分页综合起来形成常用的查询列表页面