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
      ]
    }
  },
  mounted () {
    this.init()
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
    }
  }
}
