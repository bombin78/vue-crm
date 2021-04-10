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
export default {
  props: ['value'],
  data: () => ({
    links: [
      {id: 1, title: 'Счет', url: '/', exact: true},
      {id: 2, title: 'История', url: '/history'},
      {id: 3, title: 'Планирование', url: '/planning'},
      {id: 4, title: 'Новая запись', url: '/record'},
      {id: 5, title: 'Категории', url: '/categories'},
    ],
  })
}
</script>
