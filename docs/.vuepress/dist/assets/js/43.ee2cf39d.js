(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{723:function(t,e,a){"use strict";a.r(e);var n=a(602),l=a.n(n),o={name:"search-table-demo",data:function(){return{tableData:[]}},created:function(){this.getTableData()},methods:{getTableData:function(){var t=this;l.a.get("https://proapi.azurewebsites.net/api/rule?current=1&pageSize=50").then((function(e){e=e.data,t.tableData=e.data}))}},computed:{columns:function(){return[{label:"",attrs:{type:"selection"}},{label:"规则名称",prop:"name"},{label:"描述",prop:"desc"},{label:"调用服务次数",prop:"callNo"},{label:"状态",prop:"status"},{label:"上次调度时间",prop:"updatedAt"},{label:"操作",slot:"handle"}]}}},r=a(2),s=Object(r.a)(o,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p-search-table",{attrs:{data:t.tableData,columns:t.columns},scopedSlots:t._u([{key:"handle",fn:function(e){e.row;return[a("div",[a("el-button",{attrs:{type:"primary"}},[t._v("buttonCont")])],1)]}}])})}),[],!1,null,"0e3acdb3",null);e.default=s.exports}}]);