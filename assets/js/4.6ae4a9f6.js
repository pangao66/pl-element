(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{455:function(e,a,l){var t=l(2),r=l(456);t({global:!0,forced:parseInt!=r},{parseInt:r})},456:function(e,a,l){var t=l(7),r=l(166).trim,n=l(167),o=t.parseInt,i=/^[+-]?0[Xx]/,s=8!==o(n+"08")||22!==o(n+"0x16");e.exports=s?function(e,a){var l=r(String(e));return o(l,a>>>0||(i.test(l)?16:10))}:o},563:function(e,a,l){"use strict";l.r(a);l(455),l(13),l(165);var t=l(5),r=l(79),n=(l(164),l(75)),o=l(453),i=l.n(o),s=l(3),u={designer:"设计",programmer:"程序员",testers:"测试",product:"产品"},c={0:"女",1:"男"},b={name:"search-list-demo-01",data:function(){return{formData:{id:"",name:"",birth:"",sex:"",job:"",testValue:[]},visible:!1}},methods:{getTableData:function(e,a){return Object(n.a)(regeneratorRuntime.mark((function l(){var n,o,u,c,b;return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return n=e.currentPage,o=e.pageSize,u=e.sex,c=Object(r.a)(e,["currentPage","pageSize","sex"]),l.next=3,i.a.post("/search-table",Object(s.b)(Object(t.a)({currentPage:n,pageSize:o},c,{sex:u?parseInt(u):"",testValue:void 0})));case 3:200===(b=l.sent).status&&(b=b.data,console.log(b),a({data:b.list,total:b.total}));case 5:case"end":return l.stop()}}),l)})))()},deleteData:function(e){var a=this;return Object(n.a)(regeneratorRuntime.mark((function l(){return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,i.a.post("/delete-user",{id:e.id});case 2:200===l.sent.status&&(a.$message.success("删除成功"),a.$refs.plSearchList.search());case 4:case"end":return l.stop()}}),l)})))()},handleChange:function(){}},computed:{columns:function(){var e=this;return[{prop:"index",label:"序号",type:"index"},{prop:"id",label:"id"},{slotName:"name",label:"姓名",attrs:{width:100}},{prop:"address",label:"地址",attrs:{minWidth:140}},{prop:"birth",label:"生日",formatter:"date"},{prop:"job",label:"职位",dict:u,options:u},{prop:"sex",label:"性别",tagMap:{1:{text:"男",type:"primary"},0:{text:"女",type:"success"}}},{actions:[{action:"del",text:"删除",btnConfig:{type:"danger"},confirm:function(a){var l=a.row;a.col,a.index;e.deleteData(l)}},{text:"查看",onClick:function(a){var l=a.row;a.col,a.index;e.$message.success(JSON.stringify(l))}},{text:"编辑",onClick:function(e){e.row,e.col,e.index}}],label:"操作",attrs:{minWidth:180}}]},formItems:function(){return[{comp:"input",prop:"id",label:"id"},{comp:"input",prop:"name",label:"姓名"},{comp:"date",prop:"birth",label:"生日"},{comp:"select",prop:"job",label:"职位",options:u},{comp:"select",prop:"sex",label:"性别",options:c},{slotName:"test-form-item",prop:"test",label:"测试slot"}]},options:function(){return[{value:"zhinan",label:"指南",children:[{value:"shejiyuanze",label:"设计原则",children:[{value:"yizhi",label:"一致"},{value:"fankui",label:"反馈"},{value:"xiaolv",label:"效率"},{value:"kekong",label:"可控"}]},{value:"daohang",label:"导航",children:[{value:"cexiangdaohang",label:"侧向导航"},{value:"dingbudaohang",label:"顶部导航"}]}]},{value:"zujian",label:"组件",children:[{value:"basic",label:"Basic",children:[{value:"layout",label:"Layout 布局"},{value:"color",label:"Color 色彩"},{value:"typography",label:"Typography 字体"},{value:"icon",label:"Icon 图标"},{value:"button",label:"Button 按钮"}]},{value:"form",label:"Form",children:[{value:"radio",label:"Radio 单选框"},{value:"checkbox",label:"Checkbox 多选框"},{value:"input",label:"Input 输入框"},{value:"input-number",label:"InputNumber 计数器"},{value:"select",label:"Select 选择器"},{value:"cascader",label:"Cascader 级联选择器"},{value:"switch",label:"Switch 开关"},{value:"slider",label:"Slider 滑块"},{value:"time-picker",label:"TimePicker 时间选择器"},{value:"date-picker",label:"DatePicker 日期选择器"},{value:"datetime-picker",label:"DateTimePicker 日期时间选择器"},{value:"upload",label:"Upload 上传"},{value:"rate",label:"Rate 评分"},{value:"form",label:"Form 表单"}]},{value:"data",label:"Data",children:[{value:"table",label:"Table 表格"},{value:"tag",label:"Tag 标签"},{value:"progress",label:"Progress 进度条"},{value:"tree",label:"Tree 树形控件"},{value:"pagination",label:"Pagination 分页"},{value:"badge",label:"Badge 标记"}]},{value:"notice",label:"Notice",children:[{value:"alert",label:"Alert 警告"},{value:"loading",label:"Loading 加载"},{value:"message",label:"Message 消息提示"},{value:"message-box",label:"MessageBox 弹框"},{value:"notification",label:"Notification 通知"}]},{value:"navigation",label:"Navigation",children:[{value:"menu",label:"NavMenu 导航菜单"},{value:"tabs",label:"Tabs 标签页"},{value:"breadcrumb",label:"Breadcrumb 面包屑"},{value:"dropdown",label:"Dropdown 下拉菜单"},{value:"steps",label:"Steps 步骤条"}]},{value:"others",label:"Others",children:[{value:"dialog",label:"Dialog 对话框"},{value:"tooltip",label:"Tooltip 文字提示"},{value:"popover",label:"Popover 弹出框"},{value:"card",label:"Card 卡片"},{value:"carousel",label:"Carousel 走马灯"},{value:"collapse",label:"Collapse 折叠面板"}]}]},{value:"ziyuan",label:"资源",children:[{value:"axure",label:"Axure Components"},{value:"sketch",label:"Sketch Templates"},{value:"jiaohu",label:"组件交互文档"}]}]}}},p=l(1),v=Object(p.a)(b,(function(){var e=this,a=e.$createElement,l=e._self._c||a;return l("div",[l("el-dialog",{attrs:{visible:e.visible,fullscreen:""},on:{close:function(a){e.visible=!1}}},[l("pl-search-list",{ref:"plSearchList",attrs:{columns:e.columns,"form-items":e.formItems},on:{"get-table-data":e.getTableData},scopedSlots:e._u([{key:"test-form-item",fn:function(a){var t=a.form;a.item;return[l("el-form-item",{attrs:{label:"测试slot",prop:"testValue"}},[l("el-cascader",{staticStyle:{width:"100%"},attrs:{options:e.options,clearable:""},on:{change:e.handleChange},model:{value:t.testValue,callback:function(a){e.$set(t,"testValue",a)},expression:"form.testValue"}})],1)]}},{key:"name",fn:function(a){var t=a.row;return[l("el-popover",{attrs:{trigger:"hover",placement:"top"}},[l("p",[e._v("姓名: "+e._s(t.name))]),e._v(" "),l("p",[e._v("住址: "+e._s(t.address))]),e._v(" "),l("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[l("el-tag",{attrs:{size:"medium"}},[e._v(e._s(t.name))])],1)])]}}]),model:{value:e.formData,callback:function(a){e.formData=a},expression:"formData"}})],1),e._v(" "),l("el-alert",{attrs:{type:"warning",closable:!1,center:""}},[e._v("此例请全屏查看")]),e._v(" "),l("el-button",{on:{click:function(a){e.visible=!0}}},[e._v("全屏展示")])],1)}),[],!1,null,"0a026fc7",null);a.default=v.exports}}]);