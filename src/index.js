// import pfTable from './components/pf-table/pf-table'
// import pFrom from './components/pf-table/p-form'
// import pDialogForm from './components/pf-table/p-dialog-form'
// import pfTabTable from './components/pf-table/pf-tab-table'
// import pTable from './components/pf-table/p-table'
import PlTable from './components/table'
import PSearchTable from './components/search-table'
import PlInput from './components/input'
import PlSelect from './components/select'
import PlRadio from './components/radio'
import PlCheckbox from './components/checkbox'
import PlDate from './components/date'
import PlButton, { PlActionBtn } from './components/button'
import PlTipButton from './components/tip-button'
import PlSwitch from './components/switch'
import PlTime from './components/time'
import PlForm from './components/form'
import PlSearchList from './components/search-list'
import PlSearchTabList from './components/search-tab-list'
import PlDialog from './components/dialog'
import * as utils from './utils'
import './styles/index.styl'

const PElement = {
  install: function ({ component, prototype }, opts = {}) {
    component('pl-table', PlTable)
    component('p-search-table', PSearchTable)
    component('pl-input', PlInput)
    component('pl-select', PlSelect)
    component('pl-radio', PlRadio)
    component('pl-checkbox', PlCheckbox)
    component('pl-date', PlDate)
    component('pl-switch', PlSwitch)
    component('pl-time', PlTime)
    component('pl-form', PlForm)
    component('pl-button', PlButton)
    component('pl-tip-button', PlTipButton)
    component('pl-action-btn', PlActionBtn)
    component('pl-search-list', PlSearchList)
    component('pl-search-tab-list', PlSearchTabList)
    component('pl-dialog', PlDialog)
    prototype.$PlElement = {
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
