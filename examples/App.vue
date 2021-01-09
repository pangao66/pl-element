<template>
  <div id="app">
    <router-view />
    <pl-search-list :data="[{}, {}]" :columns="[{ label: '1', prop: 'a' }]"></pl-search-list>
  </div>
</template>
<script>
export default {}
</script>
