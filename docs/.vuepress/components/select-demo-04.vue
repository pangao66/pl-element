<template>
  <el-form :model="form" label-position="right" label-suffix="：" label-width="120px">
    <pl-select label="绑定对象" prop="user" v-model="form.user" multiple :options="options" value-key="id"
               value-label="name"
               placeholder="请选择"></pl-select>
    <p>选定值为{{form.user}}</p>
  </el-form>
</template>

<script>
export default {
  name: 'select-demo-04',
  data () {
    return {
      form: {
        user: []
      }
    }
  },
  computed: {
    options () {
      return [
        { 'id': '1fD0c9d7-1CDd-c3cf-D0CA-BfEbfC33f1e5', 'name': '顾平', 'address': '广东省 东莞市 -' },
        { 'id': '3F96bddc-0C7F-BEd5-4Aac-f9b7c2e972eC', 'name': '郝娟', 'address': '河北省 沧州市 吴桥县' },
        { 'id': 'fdD4B75c-39e6-Bde8-A894-cea98838B5cc', 'name': '胡磊', 'address': '广西壮族自治区 南宁市 兴宁区' },
        { 'id': 'Cf7Beafa-CED7-dC47-EDB8-4fa638EF0a5B', 'name': '孟桂英', 'address': '湖北省 荆州市 洪湖市' }
      ]

    }
  }
}
</script>
