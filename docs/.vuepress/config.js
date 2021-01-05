const isProduction = process.env.NODE_ENV === 'production'
console.log(isProduction)
module.exports = {
  base: '/pl-element/',
  dest: './dist',
  title: 'plElement',
  description: 'elementUI组件封装',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'pElement',
      description: 'elementUI组件封装'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.ico' }],
    ['link', { rel: 'mask-icon', href: '/favicon.ico', color: '#3eaf7c' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.noob6.com/admin/theme/index.css' }],
    ['meta', { name: 'msapplication-TileImage', content: '/favicon.ico' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    // [
    //   "script",
    //   {},
    //   `
    //     var _hmt = _hmt || [];
    //     (function() {
    //       var hm = document.createElement("script");
    //       hm.src = "https://hm.baidu.com/hm.js?29de856097b96bfa02ebb5606834aa46";
    //       var s = document.getElementsByTagName("script")[0];
    //       s.parentNode.insertBefore(hm, s);
    //     })();
    //     `
    // ]
    // [ 'script', { src: 'https://shadow.elemecdn.com/npm/vue@2.5.21/dist/vue.runtime.min.js' } ],
    // [ 'script', { src: 'https://shadow.elemecdn.com/npm/vue-router@3.0.1/dist/vue-router.min.js' } ],
    // [ 'script', { src: 'https://unpkg.com/element-ui/lib/index.js' } ]
  ],
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/pangao66/pl-element',
    // 自定义仓库链接文字。
    repoLabel: '仓库地址',
    // sidebar: [
    //   {
    //     title: 'pf-table',   // 必要的
    //     path: '/pf-table',      // 可选的, 应该是一个绝对路径
    //     collapsable: false, // 可选的, 默认值是 true,
    //     sidebarDepth: 1,    // 可选的, 默认值是 1
    //     children: [
    //       '基础表格'
    //     ]
    //   }
    // ]
    sidebar: [
      {
        title: '组件',
        collapsable: true,
        children: [
          'components/install',
          'components/button',
          'components/input',
          'components/select',
          'components/radio',
          'components/checkbox',
          'components/date',
          'components/form',
          'components/table',
          'components/search-list',
          'components/tab-search-list'
        ]
      }
    ]
  },
  markdown: {
    lineNumbers: true
  },
  // title: 'Hello VuePress',
  // description: 'Just playing around'
  lastUpdated: '上次更新',
  plugins: [
    '@vuepress/last-updated'
    // '@vuepress/back-to-top'
    // [
    //   '@vuepress/pwa',
    //   {
    //     updatePopup: {
    //       message: '发现新内容可用',
    //       buttonText: '刷新'
    //     }
    //   }
    // ]
  ],
  configureWebpack: {
    externals: {
      // vue: 'Vue',
      // vuex: 'Vuex',
      // 'vue-router': 'VueRouter',
      // 'swiper': 'Swiper',
      // 'moment': 'moment'
      // 'socket.io-client': 'io'
      // 'vue':'Vue',
      // 'element-ui': 'ELEMENT'
      // 'mock': 'Mock'
    },
    output: {
      publicPath: isProduction ? 'https://cdn.noob6.com/docs/' : '',
    },
  }
  // evergreen: true
}
