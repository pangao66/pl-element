// import pfTable from './src/components/pf-table/pf-table'
// import pFrom from './src/components/pf-table/p-form'
// import pDialogForm from './src/components/pf-table/p-dialog-form'
// import pfTabTable from './src/components/pf-table/pf-tab-table'
// import pTable from './src/components/pf-table/p-table'
import PeTable from './src/components/table'
import PeSearchTable from './src/components/search-table'

const PElement = {
  install: function (Vue) {
    // Vue.component('pf-table', pfTable)
    // Vue.component('p-form', pFrom)
    // Vue.component('p-dialog-form', pDialogForm)
    // Vue.component('pf-tab-table', pfTabTable)
    // Vue.component('p-table', pTable)
    Vue.component('pe-table', PeTable)
    Vue.component('pe-search-table', PeSearchTable)
  }
}
export default PElement
