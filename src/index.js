// import pfTable from './components/pf-table/pf-table'
// import pFrom from './components/pf-table/p-form'
// import pDialogForm from './components/pf-table/p-dialog-form'
// import pfTabTable from './components/pf-table/pf-tab-table'
// import pTable from './components/pf-table/p-table'
import PlTable from './components/table'
import PlInput from './components/input'
import PlSelect from './components/select'
import PlRadio from './components/radio'
import PlCheckbox from './components/checkbox'
import PlDate from './components/date'
import PlButton from './components/button'
import PlTipButton from './components/tip-button'
import PlSwitch from './components/switch'
import PlTime from './components/time'
import PlForm from './components/form'
import PlSearchList from './components/search-list'
import PlSearchTabList from './components/search-tab-list'
import PlDialog from './components/dialog'
import PlDialogFrom from './components/dialog-form'
import * as utils from './utils'
import './styles/index.styl'

const PElement = {
  install: function (Vue, opts = {}) {
    Vue.component('pl-table', PlTable)
    Vue.component('pl-input', PlInput)
    Vue.component('pl-select', PlSelect)
    Vue.component('pl-radio', PlRadio)
    Vue.component('pl-checkbox', PlCheckbox)
    Vue.component('pl-date', PlDate)
    Vue.component('pl-switch', PlSwitch)
    Vue.component('pl-time', PlTime)
    Vue.component('pl-form', PlForm)
    Vue.component('pl-button', PlButton)
    Vue.component('pl-tip-button', PlTipButton)
    Vue.component('pl-search-list', PlSearchList)
    Vue.component('pl-search-tab-list', PlSearchTabList)
    Vue.component('pl-dialog', PlDialog)
    Vue.component('pl-dialog-form', PlDialogFrom)
    Vue.prototype.$PlElement = {
      tableConfig: opts.tableConfig,
      pageConfig: opts.pageConfig,
      selectConfig: opts.selectConfig,
      inputConfig: opts.inputConfig,
      dateConfig: opts.dateConfig,
      formConfig: opts.formConfig
    }
  }
}
export default PElement
export { utils }
