<template>
  <el-form :model="form" v-bind="$attrs" ref="plForm" :class="{advance:advanced,'search':isSearchForm}">
    <template v-if="isSearchForm">
      <el-row>
        <template v-for="(item,index) in formItems">
          <el-col :xl="6" :lg="8" :md="12" :sm="12" class="el-col-xll-6">
            <component
                :is="item.comp"
                v-bind="item"
                v-model="form[item.prop]"
                :key="index"
                :ref="item.prop"
            >
            </component>
            <slot :name="item.slot" v-bind="{form,item}"></slot>
          </el-col>
        </template>
        <el-form-item style="margin-left: auto;margin-right: 0;width: 250px;" label-width="0">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{ advanced ? '展开' : '收起' }}
            <i class="el-icon-arrow-down"/>
          </a>
        </el-form-item>
      </el-row>
    </template>
    <template v-else>
      <template v-for="(item,index) in formItems">
        <template>
          <form-item-grid
              :key="index"
              :cols="item.cols"
              :item="item"
          >
            <template v-slot="{col,item}">
              <component
                  :is="col?col.comp:item.comp"
                  v-bind="col||item"
                  v-model="form[col?col.prop:item.prop]"
                  :key="index"
                  :ref="col?col.prop:item.prop"
              >
              </component>
              <slot :name="col?col.slot:item.slot" v-bind="{form,item}"></slot>
            </template>
          </form-item-grid>
        </template>
      </template>
      <slot name="submit" v-bind="{form}">
        <el-form-item label-width="0">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </slot>
    </template>
    <slot></slot>
  </el-form>
</template>

<script>
// import { getRandomKey } from '../../utils'
import FormItemGrid from './form-item-grid'

export default {
  name: 'pl-form',
  components: { FormItemGrid },
  // model: {
  //   prop: 'defaultValue',
  //   event: 'form-change'
  // },
  props: {
    formItems: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => ({})
    },
    isSearchForm: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: this.value,
      advanced: true
    }
  },
  created () {
    this.formItems.forEach((item) => {

    })
  },
  methods: {
    submitForm () {
      this.$refs.plForm.validate().then(() => {
        this.$emit('submit', this.form)
        Promise.resolve(this.form)
      }).catch(() => {
        Promise.reject()
      })
    },
    resetForm () {
      this.$refs.plForm.resetFields()
      // this.form = this.$options.data().form
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
    // getRandomKey () {
    //   return getRandomKey()
    // }
  },
  computed: {
    // getRandomKey () {
    //   return getRandomKey()
    // }
  },
  watch: {
    // value: {
    //   immediate: true,
    //   deep: true,
    //   handler (val) {
    //     this.form = { ...this.form, ...val }
    //   }
    // },
    // form: {
    //   deep: true,
    //   handler (val) {
    //     // this.$emit('input', val)
    //     this.$emit('change', val)
    //   }
    // }
  }
}
</script>

<style lang="stylus">
  @media only screen and (min-width: 1600px) and (max-width: 1900px) {
    .el-col-xll-6 {
      width: 25%
    }
  }
  .el-form {
    &.search {
      .el-input {
        width: 100%;
      }
    }
    &.advance {
      @media only screen and (min-width: 1900px) {
        .el-col:nth-child(n+4) {
          display: none;
        }
      }
      @media only screen and (min-width: 1600px) and (max-width: 1900px) {
        .el-col:nth-child(n+4) {
          display: none;
        }
      }
      @media only screen and (min-width: 1200px) and (max-width: 1600px) {
        .el-col:nth-child(n+3) {
          display: none;
        }
      }
      @media only screen and (min-width: 992px) and (max-width: 1200px) {
        .el-col:nth-child(n+2) {
          display: none;
        }
      }
      @media only screen and (min-width: 768px) and (max-width: 992px) {
        .el-col:nth-child(n+2) {
          display: none;
        }
      }
      @media only screen and  (max-width: 768px) {
        .el-col:nth-child(n+2) {
          display: none;
        }
      }
    }
  }
</style>
