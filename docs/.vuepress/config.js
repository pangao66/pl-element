module.exports = {
  base: '/p-element/',
  dest: './dist',
  title: 'pElement',
  description: 'elementUI组件封装',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'pElement',
      description: 'elementUI组件封装'
    }
  },
  head: [
    [ 'link', { rel: 'icon', href: '/favicon.ico' } ],
    // ['link', { rel: 'manifest', href: '/manifest.json' }],
    [ 'meta', { name: 'theme-color', content: '#3eaf7c' } ],
    [ 'meta', { name: 'apple-mobile-web-app-capable', content: 'yes' } ],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    [ 'link', { rel: 'apple-touch-icon', href: '/favicon.ico' } ],
    [ 'link', { rel: 'mask-icon', href: '/favicon.ico', color: '#3eaf7c' } ],
    [ 'link', { rel: 'stylesheet', href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css' } ],
    [ 'meta', { name: 'msapplication-TileImage', content: '/favicon.ico' } ],
    [ 'meta', { name: 'msapplication-TileColor', content: '#000000' } ],
    [ 'script', { src: 'https://unpkg.com/element-ui/lib/index.js' } ]
  ],
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/pangao66/p-element',
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
          'components/table',
          '/components/pe-page-table'
          // '/components/tabs',
          // '/components/input',
          // '/components/grid',
          // '/components/layout',
          // '/components/toast',
          // '/components/popover',
          // '/components/collapse',
          // '/components/slides',
          // '/components/cascader',
          // '/components/date-picker',
          // '/components/sticky',
          // '/components/pager',
          // '/components/nav',
          // '/components/uploader',
          // '/components/validate',
          // '/components/scroll',
          // '/components/table'
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
    '@vuepress/last-updated',
    '@vuepress/back-to-top'
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
  chainWebpack: {
    // config.module
    //   .rule('js') // Find the rule.
    //   .use('babel-loader') // Find the loader
    //   .tap(options => Object.assign(options, { // Modifying options
    //     plugins: [
    //       '@babel/plugin-proposal-nullish-coalescing-operator',
    //       '@babel/plugin-proposal-optional-chaining'
    //     ]
    //   }))
    externals: {
      // vue: 'Vue',
      // vuex: 'Vuex',
      // 'vue-router': 'VueRouter',
      // 'swiper': 'Swiper',
      // 'moment': 'moment'
      // 'socket.io-client': 'io'
      'element-ui': 'ELEMENT'
    }
  }
}
