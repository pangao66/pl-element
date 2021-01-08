const pkg = require('../../package.json')
module.exports = {
  title: pkg.name,
  description: '快速搭建第三方库',
  base: '/',
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
  ]
}
