(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{427:function(e,t,r){"use strict";var n=r(208),a=r(19),s=r(29),o=r(428),l=r(209);n("search",1,(function(e,t,r){return[function(t){var r=s(this),n=null==t?void 0:t[e];return void 0!==n?n.call(t,r):new RegExp(t)[e](String(r))},function(e){var n=r(t,e,this);if(n.done)return n.value;var s=a(e),u=String(this),i=s.lastIndex;o(i,0)||(s.lastIndex=0);var c=l(s,u);return o(s.lastIndex,i)||(s.lastIndex=i),null===c?-1:c.index}]}))},428:function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}},503:function(e,t,r){"use strict";r.r(t);r(54),r(427);var n=r(136),a=r(204),s=(r(134),r(55)),o=r(408),l=r.n(o),u={name:"",data:function(){return{tableData:[],total:0}},created:function(){},methods:{getTableData:function(e,t){var r=this;return Object(s.a)(regeneratorRuntime.mark((function s(){var o,u,i;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return o=e.tabName,u=Object(a.a)(e,["tabName"]),s.next=3,l.a.post("/search-table",Object(n.a)({job:o},u));case 3:200===(i=s.sent).status?(i=i.data,r.tableData=i.list,r.total=i.total,t({tableData:i.list,total:i.total})):t();case 5:case"end":return s.stop()}}),s)})))()},deleteUser:function(e){var t=this;return Object(s.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,l.a.post("/delete-user",{id:e.id});case 2:200===(n=r.sent).status&&1===(n=n.data).code&&(t.$message.success("删除用户成功"),t.refreshTable());case 4:case"end":return r.stop()}}),r)})))()},refreshTable:function(){this.$refs["pf-tab-table"].search()},getSex:function(e){return{1:"男",0:"女"}[e]},getJob:function(e){return{designer:"设计",programmer:"程序员",testers:"测试",product:"产品"}[e.cellValue]}},computed:{tabs:function(){return[{label:"设计",name:"designer"},{label:"程序员",name:"programmer"},{label:"测试",name:"testers"},{label:"产品",name:"product"}]},columns:function(){return[{prop:"id",label:"id"},{prop:"name",label:"姓名",attrs:{width:60}},{prop:"address",label:"地址",attrs:{minWidth:140}},{prop:"birth",label:"生日",formatter:"date"},{prop:"job",label:"职位",formatter:this.getJob},{slot:"sex",label:"性别"},{slot:"handle",label:"操作",attrs:{width:170}}]},formItems:function(){return[{type:"input",prop:"name",label:"姓名"},{type:"select",prop:"sex",label:"性别",options:[{label:"男",value:1},{label:"女",value:0}]}]}}},i=r(28),c=Object(i.a)(u,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("pf-tab-table",{ref:"pf-tab-table",attrs:{tabs:e.tabs,columns:e.columns,"form-items":e.formItems},on:{"get-table-data":e.getTableData},scopedSlots:e._u([{key:"sex",fn:function(t){var n=t.row;return[r("el-tag",{attrs:{type:n.sex?"success":"danger"}},[e._v(e._s(e.getSex(n.sex)))])]}},{key:"handle",fn:function(t){var n=t.row;return[r("el-popconfirm",{attrs:{title:"请确认是否删除",width:"200",placement:"top-end"},on:{onConfirm:function(t){return e.deleteUser(n)}},scopedSlots:e._u([{key:"reference",fn:function(){return[r("el-button",{attrs:{size:"mini",type:"danger"}},[e._v("删除")])]},proxy:!0}],null,!0)})]}}])})}),[],!1,null,"43a9cf16",null);t.default=c.exports}}]);