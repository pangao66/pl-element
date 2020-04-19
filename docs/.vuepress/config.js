module.exports = {
  base: '/p-element/',
  dest: './dist',
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/xxxxxxx/blog',
    // 自定义仓库链接文字。
    repoLabel: 'My GitHub',
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
      // {
      //   title: '入门',
      //   collapsable: false,
      //   children: [
      //     '/install/',
      //     '/get-started/'
      //   ]
      // },
      {
        title: '组件',
        collapsable: false,
        children: [
          '/components/table'
          // '/components/button',
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
  plugins: [],
  chainWebpack: (config, isServer) => {
    config.module
      .rule('js') // Find the rule.
      .use('babel-loader') // Find the loader
      .tap(options => Object.assign(options, { // Modifying options
        plugins: [
          '@babel/plugin-proposal-nullish-coalescing-operator',
          '@babel/plugin-proposal-optional-chaining'
        ]
      }))
  }
}
