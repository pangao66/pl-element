(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{521:function(e,o,l){"use strict";l.r(o);var t={name:"radio-demo-01",data:function(){return{form:{sex:"",city:""}}},computed:{options1:function(){return[{label:"男",value:1},{label:"女",value:0}]},options2:function(){return[{label:"北京",value:"beijing"},{label:"上海",value:"shanghai"},{label:"广州",value:"guangzhou"},{label:"深圳",value:"shenzhen"}]}}},a=l(2),n=Object(a.a)(t,(function(){var e=this,o=e.$createElement,l=e._self._c||o;return l("el-form",{attrs:{model:e.form,"label-position":"right","label-suffix":"：","label-width":"120px"}},[l("pl-radio",{attrs:{label:"性别",prop:"sex",options:e.options1,required:""},model:{value:e.form.sex,callback:function(o){e.$set(e.form,"sex",o)},expression:"form.sex"}}),e._v(" "),l("p",[e._v("您选中的性别值是："+e._s(e.form.sex))]),e._v(" "),l("pl-radio",{attrs:{label:"城市",prop:"city",options:e.options2,"radio-button":""},model:{value:e.form.city,callback:function(o){e.$set(e.form,"city",o)},expression:"form.city"}}),e._v(" "),l("p",[e._v("您选中城市的值是："+e._s(e.form.city))])],1)}),[],!1,null,null,null);o.default=n.exports}}]);