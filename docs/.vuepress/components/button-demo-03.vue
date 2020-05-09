<template>
  <div>
    <pl-button confirm-type="pop" type="primary" @confirm="confirm" fullscreen-loading >删除</pl-button>
    <pl-button confirm-type="confirm" type="danger" @confirm="confirm" fullscreen-loading >删除</pl-button>
  </div>
</template>

<script>
export default {
  name: 'button-demo-03',
  methods: {
    confirm (done) {
      setTimeout(() => {
        done()
      }, 1000)
    }
  }
}
</script>
