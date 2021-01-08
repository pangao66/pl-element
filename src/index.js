// import FileHandle from '../packages/file-handle/index'
// import TestModule from '../packages/test-module/index'
import PlTable from '../packages/components/table'
import PlInput from '../packages/components/input'
import PlSelect from '../packages/components/select'
import PlRadio from '../packages/components/radio'
import PlCheckbox from '../packages/components/checkbox'
import PlDate from '../packages/components/date'
import PlButton from '../packages/components/button'
import PlTipButton from '../packages/components/tip-button'
import PlSwitch from '../packages/components/switch'
import PlTime from '../packages/components/time'
import PlForm from '../packages/components/form'
import PlSearchList from '../packages/components/search-list'
import PlSearchTabList from '../packages/components/search-tab-list'
import PlDialog from '../packages/components/dialog'
import PlDialogFrom from '../packages/components/dialog-form'
// import * as utils from '../packages/utils'
import '../packages/styles/index.styl'
import { version } from '../package.json'

const components = [PlTable, PlInput, PlSelect, PlRadio, PlCheckbox, PlDate, PlButton, PlTipButton, PlSwitch, PlTime, PlForm, PlSearchList, PlSearchTabList, PlDialog, PlDialogFrom]
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) {
    return
  }
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version,
  install,
  PlTable,
  PlInput,
  PlSelect,
  PlRadio,
  PlCheckbox,
  PlDate,
  PlButton,
  PlTipButton,
  PlSwitch,
  PlTime,
  PlForm,
  PlSearchList,
  PlSearchTabList,
  PlDialog,
  PlDialogFrom
}
