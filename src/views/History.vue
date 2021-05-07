<template>
  <div>

    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Нет добавленных записей.<br>
      <router-link to="/record">Добавить запись</router-link>
    </p>

    <section v-else>
      <history-table :records="items" />
      <paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'">
      </paginate>
    </section>

  </div>

  <!-- <div>

    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Нет добавленных записей.<br>
      <router-link to="/record">Добавить запись</router-link>
    </p>

    <section v-else>
      <history-table :records="records" />
      <paginate
        :page-count="20"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'">
      </paginate>
    </section>

  </div> -->
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'

export default {
  name: 'history',
  mixins: [paginationMixin],
  components: {
    HistoryTable
  },
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {

    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(category => category.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      };
    }));

    this.loading = false;


    // const records = await this.$store.dispatch('fetchRecords');
    // const categories = await this.$store.dispatch('fetchCategories');

    // this.records = records.map(record => {
    //   return {
    //     ...record,
    //     categoryName: categories.find(category => category.id === record.categoryId).title,
    //     typeClass: record.type === 'income' ? 'green' : 'red',
    //     typeText: record.type === 'income' ? 'Доход' : 'Расход',
    //   };
    // });

    // this.loading = false;
  },
}
</script>
