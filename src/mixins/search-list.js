import screenfull from 'screenfull'

export default {
  data () {
    return {
      isFullscreen: false,
      size: 'small',
      sizeList: [
        { label: '宽松', value: 'default' },
        { label: '中等', value: 'medium' },
        { label: '默认', value: 'small' },
        { label: '紧凑', value: 'mini' }
      ],
      calColumns: []
    }
  },
  created () {
    if (this.tableConfig && this.tableConfig.size) {
      this.size = this.tableConfig.size
    }
  },
  mounted () {
    this.init()
    this.initColumns()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    toggleSize (size) {
      this.size = size
    },
    toggleFullScreen () {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle().then(() => {
      })
    },
    change () {
      this.isFullscreen = screenfull.isFullscreen
    },
    init () {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy () {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    },
    initColumns () {
      const list = []
      this.columns.forEach((item, index) => {
        const attrs = item.attrs || {}
        list.push({
          ...item,
          index,
          show: true,
          attrs: { ...attrs }
        })
      })
      this.calColumns = list
    },
    columnsChange ({ show, index, direction, active }) {
      if (show && show !== false) {
        this.calColumns[index].show = true
      }
      if (direction !== undefined) {
        this.$set(this.calColumns[index].attrs, 'fixed', direction || undefined)
      }
      if (typeof active === 'boolean') {
        this.$set(this.calColumns[index].attrs, 'active', active)
      } else {
        this.resetTableKey()
      }
    },
    resetColumns () {
      this.initColumns()
      this.resetTableKey()
    }
  },
  computed: {
    resultColumns () {
      return this.calColumns.filter((item) => !!item.show)
    }
  }
}
