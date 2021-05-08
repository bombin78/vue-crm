<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
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
        :page-class="'waves-effect'"
      /> 
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'
import {Pie} from 'vue-chartjs'

export default {
  name: 'history',
  components: {
    HistoryTable,
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categoires = await this.$store.dispatch('fetchCategories');

    this.setup(categoires);
    
    this.loading = false;
  },
  methods: {
    setup(categoires) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categoires.find(category => category.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        }
      }));

      this.renderChart({
        labels: categoires.map(category => category.title),
        datasets: [{
            label: 'Расходы по категориям',
            data: categoires.map(category => {
              return this.records.reduce((total, record) => {
                if (record.categoryId === category.id && record.type === 'outcome') {
                  total += Number(record.amount);
                }
                return total;
              }, 0)
            }),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }],
      });
    },
  },
}
</script>
