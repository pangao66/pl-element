<template>
  <div>
    <pl-button loading @click="handleClick" type="success">自动loading</pl-button>
    <pl-button fullscreen-loading @click="handleClick" type="warning">全屏loading</pl-button>
  </div>
</template>

<script>
export default {
  name: 'button-demo-02',
  data () {
    return {
      fullscreenLoading: false
    }
  },
  methods: {
    handleClick (done) {
      setTimeout(() => {
        // do something
        done()
      }, 1000)
    }
  }
}
</script>
