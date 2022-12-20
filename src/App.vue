<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getSortOrder: 'getSortOrder'
    }),
    symbols() {
      return this.$store.getters.symbols
    }
  },
  methods: {
    ...mapMutations({
      updateSymbol: "UPDATE_SYMBOLS", // map `this.add()` to `this.$store.commit('increment')`
    }),
    ...mapActions({
      loadData: "loadData",
      sortSymbols: "sortSymbols"
    }),
    convertDate(isoFormat) {
      let date = new Date(isoFormat);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
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
          <th>Month -/+
            <span v-if="getSortOrder('priceDiff') == 'asc'" @click="sortSymbols({sortArg: 'priceDiff', order: 'desc'})">
              <font-awesome-icon icon="fa-solid fa-chevron-up" class="sort-icon" />
            </span>
            <span v-if="getSortOrder('priceDiff') == 'desc'" @click="sortSymbols({sortArg: 'priceDiff', order: 'asc'})">
              <font-awesome-icon icon="fa-solid fa-chevron-down" class="sort-icon" />
            </span>
          </th>
          <th>Month %
            <span v-if="getSortOrder('pricePerc') == 'asc'" @click="sortSymbols({sortArg: 'pricePerc', order: 'desc'})">
              <font-awesome-icon icon="fa-solid fa-chevron-up" class="sort-icon" />
            </span>
            <span v-if="getSortOrder('pricePerc') == 'desc'" @click="sortSymbols({sortArg: 'pricePerc', order: 'asc'})">
              <font-awesome-icon icon="fa-solid fa-chevron-down" class="sort-icon" />
            </span>
          </th>
          <th>52-week Low</th>
          <th>52-week -/+
            <span v-if="getSortOrder('_52weekDiff') == 'asc'" @click="sortSymbols({sortArg: '_52weekDiff', order: 'desc'})">
              <font-awesome-icon icon="fa-solid fa-chevron-up" class="sort-icon" />
            </span>
            <span v-if="getSortOrder('_52weekDiff') == 'desc'" @click="sortSymbols({sortArg: '_52weekDiff', order: 'asc'})">
              <font-awesome-icon icon="fa-solid fa-chevron-down" class="sort-icon" />
            </span>
          </th>
          <th>52-week %
            <span v-if="getSortOrder('_52weekPerc') == 'asc'" @click="sortSymbols({sortArg: '_52weekPerc', order: 'desc'})">
              <font-awesome-icon icon="fa-solid fa-chevron-up" class="sort-icon" />
            </span>
            <span v-if="getSortOrder('_52weekPerc') == 'desc'" @click="sortSymbols({sortArg: '_52weekPerc', order: 'asc'})">
              <font-awesome-icon icon="fa-solid fa-chevron-down" class="sort-icon" />
            </span>
          </th>
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
          <td style="min-width: 90px">{{ convertDate(item.date) }}</td>
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
th,
td {
  min-width: 80px;
  text-align: center;
  padding: 5px 10px;
}

td {
  border-bottom: 1px solid lightgrey
}

table {
  border: 1px solid #d9d9d9;
  border-spacing: 0px;
}

tr:first-child {
  background-color: lightgrey;
}

tr:last-child>td {
  border-bottom: none
}

.sort-icon {
  font-size: 11px;
  padding: 0px 0px 0px 5px;
  cursor: pointer;
}
</style>
