<template>
  <div>

    <loader v-if="loading" />

    <div v-else class="app-main-layout">
      <navbar @clickDehaze="isOpen = !isOpen" />
      <sidebar v-model="isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link 
          class="btn-floating btn-large blue" 
          to="/record"
          v-tooltip="'Создать новую запись'"
          data-position="left">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import messages from '@/utils/messages'
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";

export default {
  name: "main-layout",
  components: {
    Navbar,
    Sidebar,
  },
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Something went wrong');
    },
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
};
</script>

