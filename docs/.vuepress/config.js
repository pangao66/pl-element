const pkg = require('../../package.json')
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  title: pkg.name,
  description: 'elementUI二次封装',
  base: '/pl-element/',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '简介', link: '/guide/introduction' },
      { text: '常见问题', link: '/problem' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '简介',
          collapsable: false,
          children: [
            { title: '介绍', path: 'introduction', collapsable: false, },
            'install',
            'button',
            'input',
            'select',
            'radio',
            'checkbox',
            'date',
            'form',
            'table',
            'search-list',
            'tab-search-list'
          ]
        }
      ],
      '/problem/': [
        {
          title: '常见问题',
          collapsable: false,
          children: [
            {
              title: '使用说明',
              path: 'test',
              collapsable: false,
            }
          ]
        }
      ]
    },
    sidebarDepth: 1
  },
  plugins: [
    // 回到顶部
    '@vuepress/back-to-top',

    // 放大
    ['@vuepress/medium-zoom', { selector: 'img' }]
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
      publicPath: isProduction ? 'https://cdn.noob6.com/docs/' : undefined,
    },
  }
}
