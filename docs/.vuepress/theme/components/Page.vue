<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" >
    </Content>
    <div style="position:fixed;
    right: 100px;top: 100px;width:300px;height: 200px;background:red;z-index: 1000;">122</div>
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />

    <div id="gitalk-container"></div>
  </main>
</template>

<script>
import PageEdit from '@parent-theme/components/PageEdit.vue'
import PageNav from '@parent-theme/components/PageNav.vue'
import Gitalk from 'gitalk'
export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems'],
  mounted() {
    this.init(location.pathname)
    this.$router.afterEach((to, from) => {
      if (to.path !== from.path) {
        console.log(to.path, from.path, '页面切换了')
        this.init(to.path)
      }
    })
  },
  methods: {
    init(path) {
      const gitalk = new Gitalk({
        clientID: 'bd729577007e51c7024e',
        clientSecret: '2ffab37b6220d89b521a4c2e3d1093bf7ca86ec1',
        repo: 'p-element',
        owner: 'pangao66',
        // 这里接受一个数组，可以添加多个管理员
        admin: ['pangao66'],
        id: location.pathname,
        body: location.pathname,
        distractionFreeMode: false
      })
      const dom = document.getElementById('gitalk-container')
      dom && (dom.innerHTML = '')
      gitalk.render('gitalk-container')
    }
  }
}
</script>

<style lang="stylus">
  // @require '../styles/wrapper.styl'
  @require '../../styles/gitalk.styl';
  .page {
    padding-bottom: 2rem;
    display: block;
  }
  #gitalk-container {
    padding: 0 2.25rem;
    max-width: 740px;
    margin: 0 auto;
  }
</style>
