// import Element from 'main/index.js';
import Element from 'element-ui'
import { stripScript, stripStyle, stripTemplate } from '../util.js'

const { version } = Element
export default {
  methods: {
    goCodepen () {
      // since 2.6.2 use code rather than jsfiddle https://blog.codepen.io/documentation/api/prefill/
      const { script, html, style } = this.codepen
      console.log(html)
      const resourcesTpl = `
<script src="https://cdn.noob6.com/lib/vue/2.6.12/vue.min.js"><\/script>
<!-- 引入样式 -->
<link rel="stylesheet" href="https://cdn.noob6.com/lib/element-ui/2.14.1/index.min.css">
<link rel="stylesheet" href="https://cdn.noob6.com/lib/pl-element/theme/pl-element.css">
<!-- 引入组件库 -->
<script src="https://cdn.noob6.com/lib/element-ui/2.14.1/index.js"><\/script>
<script src="https://cdn.noob6.com/lib/pl-element/pl-element.umd.min.js"><\/script>
<div id="app">
 ${html}
</div>
`
      let jsTpl = (script || '').replace(/export default/, 'var Main =').trim()
      // let htmlTpl = `${resourcesTpl}\n<div id="app">\n${html.trim()}\n</div>`
      // let cssTpl = `@import url("//unpkg.com/element-ui@${version}/lib/theme-chalk/index.css");\n${(style || '').trim()}\n  @import url("https://oss.noob6.com/pl-element/pl-element.css");\\n${(style || '').trim()}\n`
      let cssTpl=`${(style||'')}`
      jsTpl = jsTpl
        ? jsTpl + '\nvar Ctor = Vue.extend(Main)\nnew Ctor().$mount(\'#app\')'
        : 'new Vue().$mount(\'#app\')'
      const data = {
        js: jsTpl,
        css: cssTpl,
        html: resourcesTpl
      }
      const form = document.getElementById('fiddle-form') || document.createElement('form')
      while (form.firstChild) {
        form.removeChild(form.firstChild)
      }
      form.method = 'POST'
      form.action = 'https://codepen.io/pen/define/'
      form.target = '_blank'
      form.style.display = 'none'

      const input = document.createElement('input')
      input.setAttribute('name', 'data')
      input.setAttribute('type', 'hidden')
      input.setAttribute('value', JSON.stringify(data))
      form.appendChild(input)
      document.body.appendChild(form)

      form.submit()
    }
  }
}
