
import PlTable from './src/components/table'
import PlInput from './src/components/input'
import PlSelect from './src/components/select'
import PlRadio from './src/components/radio'
import PlCheckbox from './src/components/checkbox'
import PlDate from './src/components/date'
import PlButton from './src/components/button'
import PlTipButton from './src/components/tip-button'
import PlSwitch from './src/components/switch'
import PlTime from './src/components/time'
import PlForm from './src/components/form'
import PlSearchList from './src/components/search-list'
import PlSearchTabList from './src/components/search-tab-list'
import PlDialog from './src/components/dialog'
import PlDialogFrom from './src/components/dialog-form'
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
