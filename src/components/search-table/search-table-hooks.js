import Vue from 'vue'

function useSearchTable () {
  const pageSize = Vue.observable(10)
  const currentPage = Vue.observable(1)
  return {
    pageSize: ''
  }
}
