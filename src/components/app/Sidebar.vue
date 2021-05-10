<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">

    <router-link
      v-for="link in links"
      :key="link.id"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact">
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>


<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  props: ['value'],
  data: () => ({
    links: [
      {id: 1, title: localizeFilter('Menu_Bill'), url: '/', exact: true},
      {id: 2, title: localizeFilter('Menu_History'), url: '/history'},
      {id: 3, title: localizeFilter('Menu_Planning'), url: '/planning'},
      {id: 4, title: localizeFilter('Menu_NewRecord'), url: '/record'},
      {id: 5, title: localizeFilter('Menu_Categories'), url: '/categories'},
    ],
  })
}
</script>
