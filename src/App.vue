<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
   data() {
    return {
      count: 1
    }
  },
  computed: {
    ...mapGetters([
      'symbols',
    ]),
  },
  methods: {
    ...mapMutations({
      updateSymbol: 'UPDATE_SYMBOL' // map `this.add()` to `this.$store.commit('increment')`
    }),
    ...mapActions({
      loadData: 'loadData'
    }),
    load() {
      console.log('load')
      for (let i = 0; i < this.symbols.length; i++) {
        const symbolObj = this.symbols[i];
        this.loadData(symbolObj)
      }
    }
  },
  mounted() {
    console.log('App mounted')
    // console.log(this.$store)
    // console.log(this.symbols)
    // console.log(this.updateSymbol({ symbol: 'NFLX', currentPrice: 12}))
    // console.log(this.symbols)
  }
}

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
          <th>52-week Low</th>
        </tr>
        <tr v-for="item in symbols" :key="item.symbol">
          <td>{{item.symbol}}</td>
          <td>{{item.currentPrice}}</td>
          <td>{{item.monthLow}}</td>
          <td>{{item._52weekLow}}</td>
        </tr>
      </table>

      <div>
        <button @click="load()">Load data</button>
      </div>
    </div>
  </header>

  <!-- <RouterView /> -->
</template>

<style scoped>
table, th, td {
  border: 1px solid black;
}
th, td {
    min-width: 100px;
    text-align: center;
  }
</style>
