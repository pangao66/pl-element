// import pfTable from './src/components/pf-table/pf-table'
// import pFrom from './src/components/pf-table/p-form'
// import pDialogForm from './src/components/pf-table/p-dialog-form'
// import pfTabTable from './src/components/pf-table/pf-tab-table'
// import pTable from './src/components/pf-table/p-table'
import PlTable from './src/components/table'
import PSearchTable from './src/components/search-table'
import PlInput from './src/components/input'
import PlSelect from './src/components/select'
import PlRadio from './src/components/radio'
import PlCheckbox from './src/components/checkbox'
import PlDate from './src/components/date'
import PlButton, { PlActionBtn } from './src/components/button'
import PlSwitch from './src/components/switch'
import PlTime from './src/components/time'
import PlForm from './src/components/form'
import PlSearchList from './src/components/search-list'
import PlSearchTabList from './src/components/search-tab-list'
import PlDialog from './src/components/dialog'
import * as utils from './src/utils'
import './src/styles/index.styl'

const PElement = {
  install: function (Vue, opts = {}) {
    Vue.component('pl-table', PlTable)
    Vue.component('p-search-table', PSearchTable)
    Vue.component('pl-input', PlInput)
    Vue.component('pl-select', PlSelect)
    Vue.component('pl-radio', PlRadio)
    Vue.component('pl-checkbox', PlCheckbox)
    Vue.component('pl-date', PlDate)
    Vue.component('pl-switch', PlSwitch)
    Vue.component('pl-time', PlTime)
    Vue.component('pl-form', PlForm)
    Vue.component('pl-button', PlButton)
    Vue.component('pl-action-btn', PlActionBtn)
    Vue.component('pl-search-list', PlSearchList)
    Vue.component('pl-search-tab-list', PlSearchTabList)
    Vue.component('pl-dialog', PlDialog)
    Vue.prototype.$PlElement = {
      tableConfig: opts.tableConfig,
      pageConfig: opts.pageConfig,
      selectConfig: opts.selectConfig,
      inputConfig: opts.inputConfig,
      formConfig: opts.formConfig
    }
  }
}
export default PElement
export { utils }
