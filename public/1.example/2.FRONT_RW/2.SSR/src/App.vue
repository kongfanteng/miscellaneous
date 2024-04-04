<template>
  <div class="app">
    <router-view />
  </div>
</template>
<script>
export default {
  asyncData({ store, route }) {
    return store.dispatch('getCount')
  },
  name: 'App',
}
</script>
