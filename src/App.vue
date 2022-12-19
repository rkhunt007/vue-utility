<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      count: 1,
    };
  },
  computed: {
    ...mapGetters(["symbols"]),
  },
  methods: {
    ...mapMutations({
      updateSymbol: "UPDATE_SYMBOLS", // map `this.add()` to `this.$store.commit('increment')`
    }),
    ...mapActions({
      loadData: "loadData",
    }),
    convertDate(isoFormat) {
      let date = new Date(isoFormat);
      return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
    }
  },
  mounted() {
    this.loadData();
  },
};
</script>

<template>
  <header>
    <div class="wrapper">
      <h3>Stocks</h3>
      <table>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th>Month Low</th>
          <th>Month -/+</th>
          <th>Month %</th>
          <th>52-week Low</th>
          <th>52-week -/+</th>
          <th>52-week %</th>
          <th>Last updated</th>
        </tr>
        <tr v-for="item in symbols" :key="item.symbol">
          <td>{{ item.symbol }}</td>
          <td>{{ item.currentPrice }}</td>
          <td>{{ item.monthLow }}</td>
          <td>{{ item.priceDiff }}</td>
          <td>{{ item.pricePerc }}</td>
          <td>{{ item._52weekLow }}</td>
          <td>{{ item._52weekDiff }}</td>
          <td>{{ item._52weekPerc }}</td>
          <td>{{ convertDate(item.date) }}</td>
        </tr>
      </table>

      <div>
        <button @click="loadData()">Refresh data</button>
      </div>
    </div>
  </header>

  <!-- <RouterView /> -->
</template>

<style scoped>
table,
th,
td {
  border: 1px solid black;
}
th,
td {
  min-width: 80px;
  text-align: center;
} 
</style>
