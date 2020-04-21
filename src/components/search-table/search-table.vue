<template>
  <div>
    <div>
      <div class="pe-search-table-tools">
        <el-popover
            placement="top-start"
            title="标题"
            width="200"
            trigger="hover"
        >
          <div>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="columnsShowList" @change="columnsShowChange">
              <el-checkbox v-for="item in columns" :label="item.label" :key="item.label">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <el-icon class="el-icon-setting" slot="reference"></el-icon>
        </el-popover>
      </div>
      <pe-table :data="data" :columns="tableColumns"></pe-table>
      <!--      <el-pagination></el-pagination>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-table',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    tableConfig: {
      type: Object,
      default: () => ({})
    },
    pageConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      columnsCopy: [],
      isIndeterminate: true,
      checkAll: true,
      columnsShowList: []
    }
  },
  methods: {
    initColumnsCopy () {
      const list = JSON.parse(JSON.stringify(this.columns))
      list.forEach((item) => {
        item.show = true
      })
      this.columnsCopy = list
    },
    handleCheckAllChange (val) {
      this.columnsShowList = val ? this.columns.map((item) => item.label) : []
      this.isIndeterminate = false
    },
    columnsShowChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.columns.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length
    }
  },
  computed: {
    tableColumns () {
      return this.columnsCopy.filter((item) => {
        return item.show
      })
    }
  },
  watch: {
    columns: {
      deep: true,
      immediate: true,
      handler () {
        this.initColumnsCopy()
      }
    }
  }
}
</script>

<style scoped>

</style>
