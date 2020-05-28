<template>
  <div>
    <el-form :model="form" v-on="$listeners" v-bind="{...defaultFormOptions,...formConfig}" class="pl-search-list-form"
             :class="[{advance:advanced},hasChildClass]">
      <el-row :gutter="10">
        <template v-for="(item,index) in formItems">
          <el-col :xl="6" :lg="8" :md="12" :sm="24" class="el-col-xll-6">
            <component
                :is="getComp(item.comp)"
                v-bind="item"
                v-model="form[item.prop]"
                :key="getRandomKey(item)"
                :ref="item.prop"
            >
            </component>
            <slot :name="item.slot" v-bind="{form,item}"></slot>
          </el-col>
        </template>
        <el-form-item style="float:right;" label-width="0">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
          <a @click="toggleAdvanced" style="margin-left: 8px" class="advance-toggle-btn">
            {{ advanced ? '展开' : '收起' }}
            <i class="el-icon-arrow-down"/>
          </a>
        </el-form-item>
      </el-row>
    </el-form>
    <slot name="form-after"></slot>
    <pl-table :columns="columns" :table-config="tableConfig" :page-config="pageConfig" show-pager v-on="$listeners"
              auto-load>
      <template v-for="item in columns">
        <slot :name="item.slotName" :slot="item.slotName" v-bind="item"></slot>
      </template>
    </pl-table>
  </div>
</template>

<script>
import { getRandomKey } from '../../utils'

const Item2UIDMap = new WeakMap()
export default {
  name: 'pl-search-list',
  props: {
    formItems: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    pageConfig: {
      type: Object,
      default: () => ({})
    },
    formConfig: {
      type: Object,
      default: () => ({})
    },
    tableConfig: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      form: this.value,
      defaultFormOptions: {
        labelWidth: '90px',
        labelPosition: 'right',
        labelSuffix: '：'
      },
      advanced: false
    }
  },
  methods: {
    search () {},
    resetForm () {},
    getRandomKey (item) {
      const persistedUID = Item2UIDMap.get(item)
      if (!persistedUID) {
        Item2UIDMap.set(item, getRandomKey())
        return getRandomKey()
      }
      return persistedUID
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    getComp (comp) {
      const map = {
        input: 'pl-input',
        select: 'pl-select',
        radio: 'pl-radio',
        checkbox: 'pl-checkbox',
        date: 'pl-date',
        time: 'pl-time',
        'switch': 'pl-switch'
      }
      return map[comp] || comp
    }
  },
  computed: {
    hasChildClass () {
      let length = this.formItems.length
      if (length > 5) {
        length = 5
      }
      return `has-items-gt-${length}`
    }
  }
}
</script>

<style lang="stylus">
  .pl-search-list-form {
    .el-input {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    &.has-items-gt-1 {
      .advance-toggle-btn {
        display: none;
      }
    }
    @media only screen and (min-width: 1900px) {
      &.advance {
        .el-col:nth-child(n+4) {
          display: none;
        }
      }
      &.has-items-gt-2 {
        .advance-toggle-btn {
          display: none;
        }
      }
      &.has-items-gt-3 {
        .advance-toggle-btn {
          display: none;
        }
      }
    }
    @media only screen and (min-width: 1600px) and (max-width: 1900px) {
      &.advance {
        .el-col:nth-child(n+4) {
          display: none;
        }
      }
      &.has-items-gt-2 {
        .advance-toggle-btn {
          display: none;
        }
      }
      &.has-items-gt-3 {
        .advance-toggle-btn {
          display: none;
        }
      }
    }
    @media only screen and (min-width: 1200px) and (max-width: 1600px) {
      &.advance {
        .el-col:nth-child(n+3) {
          display: none;
        }
      }
      &.has-items-gt-2 {
        .advance-toggle-btn {
          display: none;
        }
      }
    }
    @media only screen and (min-width: 992px) and (max-width: 1200px) {
      &.advance {
        .el-col:nth-child(n+2) {
          display: none;
        }
      }
    }
    @media only screen and (min-width: 768px) and (max-width: 992px) {
      &.advance {
        .el-col:nth-child(n+2) {
          display: none;
        }
      }
    }
    @media only screen and  (max-width: 768px) {
      &.advance {
        .el-col:nth-child(n+2) {
          display: none;
        }
      }
    }
  }
</style>
