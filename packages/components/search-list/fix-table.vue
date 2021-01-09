<template>
  <div class="fix-table-container">
    <div>
      <!--      <el-checkbox v-model="showAllList">列显示</el-checkbox>-->
      <span>列显示</span>
      <el-button type="text" style="float:right" @click="resetColumns">
        重置
      </el-button>
    </div>
    <template v-for="item in showColumns">
      <h3 v-if="item.list.length && showColumns.length > 1" :key="item.title">
        {{ item.title }}
      </h3>
      <div
        v-for="col in item.list"
        :key="col.label"
        style="line-height: 30px;"
        @mouseenter="mouseEnter(col.index)"
        @mouseleave="mouseLeave(col.index)"
      >
        <el-checkbox
          v-if="col.label"
          v-model="col.show"
          @change="(val) => handleChange(val, col.index)"
        >
          {{ col.label }}
        </el-checkbox>
        <el-tooltip v-if="col.tip" effect="dark" :content="col.tip" placement="top">
          <i class="el-icon-question" />
        </el-tooltip>
        <template v-if="col.attrs.active">
          <el-tooltip
            v-if="col.attrs.fixed !== 'right'"
            content="固定在右边"
            effect="dark"
            placement="top"
          >
            <!--            <svg-icon-->
            <!--              icon-class="td-right"-->
            <!--              style="cursor:pointer;margin-left: 8px;"-->
            <!--              @click="handleFix(col.index,'right')"-->
            <!--            ></svg-icon>-->
            <pl-icon
              type="td-right"
              style="cursor:pointer;margin-left: 8px;"
              @click.native="handleFix(col.index, 'right')"
            ></pl-icon>
          </el-tooltip>
          <el-tooltip
            v-if="col.attrs.fixed !== 'left'"
            content="固定在左边"
            effect="dark"
            placement="top"
          >
            <!--            <svg-icon-->
            <!--              icon-class="tuding"-->
            <!--              style="cursor:pointer;margin-left: 8px;"-->
            <!--              @click="handleFix(col.index,'left')"-->
            <!--            ></svg-icon>-->
            <pl-icon
              type="tuding"
              style="cursor:pointer;margin-left: 8px;"
              @click.native="handleFix(col.index, 'left')"
            ></pl-icon>
          </el-tooltip>
          <el-tooltip v-if="col.attrs.fixed" content="取消固定" effect="dark" placement="top">
            <!--            <svg-icon-->
            <!--              icon-class="guding"-->
            <!--              style="cursor:pointer;margin-left: 8px;"-->
            <!--              @click="handleFix(col.index,null)"-->
            <!--            ></svg-icon>-->
            <pl-icon
              type="guding"
              style="cursor:pointer;margin-left: 8px;"
              @click="handleFix(col.index, null)"
            ></pl-icon>
          </el-tooltip>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import PlIcon from '../../components/pl-icon/pl-icon'

export default {
  name: 'FixTable',
  components: { PlIcon },
  props: {
    calColumns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showAllList: true
    }
  },
  computed: {
    showColumns() {
      const noFixed = []
      const fixedLeft = []
      const fixedRight = []
      this.calColumns.forEach((item) => {
        const {
          attrs: { fixed }
        } = item
        switch (fixed) {
          case undefined:
            noFixed.push(item)
            break
          case 'left':
            fixedLeft.push(item)
            break
          case 'right':
            fixedRight.push(item)
            break
          default:
            noFixed.push(item)
        }
      })
      return [
        {
          title: '不固定',
          list: noFixed
        },
        {
          title: '固定在左边',
          list: fixedLeft
        },
        {
          title: '固定在右边',
          list: fixedRight
        }
      ]
    }
  },
  methods: {
    handleChange(val, index) {
      this.$emit('column-change', {
        show: val,
        index
      })
    },
    handleFix(index, direction) {
      this.$emit('column-change', {
        index,
        direction
      })
    },
    mouseEnter(index) {
      this.$emit('column-change', {
        index,
        active: true
      })
    },
    mouseLeave(index) {
      this.$emit('column-change', {
        index,
        active: false
      })
    },
    resetColumns() {
      this.$emit('reset-columns')
    }
  }
}
</script>

<style lang="stylus">
.fix-table-container {
  width: 180px;

  h3 {
    margin: 0
  }

  .el-checkbox {
  }
}
</style>
