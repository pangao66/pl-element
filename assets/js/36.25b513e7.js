(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{566:function(e,o,l){"use strict";l.r(o);var a={name:"select-demo-01",data:function(){return{value1:"",value2:"",value3:""}},computed:{options1:function(){return[{value:"选项1",label:"黄金糕"},{value:"选项2",label:"双皮奶"},{value:"选项3",label:"蚵仔煎"},{value:"选项4",label:"龙须面"},{value:"选项5",label:"北京烤鸭"}]},options2:function(){return[{jobName:"设计",jobCode:"designer"},{jobName:"程序员",jobCode:"programmer"},{jobName:"测试",jobCode:"testers"},{jobName:"产品",jobCode:"product"}]},options3:function(){return{cash:"现金",prepaid_card:"预付卡",entity:"实物",maintenance:"保养",cosmetology:"美容",car_wash:"洗车"}}}},t=l(1),n=Object(t.a)(a,(function(){var e=this,o=e.$createElement,l=e._self._c||o;return l("div",[l("h4",[e._v("options")]),e._v(" "),l("p",[e._v("传入el-select标准的options,label-value结构")]),e._v(" "),l("pl-select",{attrs:{label:"商品名",options:e.options1},model:{value:e.value1,callback:function(o){e.value1=o},expression:"value1"}}),e._v(" "),l("p",[e._v("options配置别名")]),e._v(" "),l("pl-select",{attrs:{label:"职位",options:e.options2,"options-attr":"jobName,jobCode"},model:{value:e.value2,callback:function(o){e.value2=o},expression:"value2"}}),e._v(" "),l("p",[e._v("传入对象结构")]),e._v(" "),l("pl-select",{attrs:{label:"礼品类型",options:e.options3},model:{value:e.value3,callback:function(o){e.value3=o},expression:"value3"}})],1)}),[],!1,null,null,null);o.default=n.exports}}]);