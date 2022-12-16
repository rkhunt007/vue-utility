import { createStore } from 'vuex'
import { UPDATE_SYMBOL } from './mutation-types'
import axios from '../api';
import apiFields from '../constants'
import AMZN from '../testData/AMZN'
import NFLX from '../testData/NFLX'

// Create a new store instance.
export default createStore({
    state() {
        return {
            symbols: [
                {
                    symbol: 'NFLX',
                    currentPrice: 0,
                    monthLow: 0,
                    _52weekLow: 0
                },
                {
                    symbol: 'AMZN',
                    currentPrice: 0,
                    monthLow: 0,
                    _52weekLow: 0
                }
            ]
        }
    },
    getters: {
        symbols(state) {
            return state.symbols
        }
    },
    mutations: {
        [UPDATE_SYMBOL](state, payload) {
            console.log('UPDATE_SYMBOL', payload);
            for (let i = 0; i < state.symbols.length; i++) {
                if (state.symbols[i].symbol === payload.symbol) {
                    if (payload.currentPrice) state.symbols[i].currentPrice = payload.currentPrice;
                    if (payload.monthLow) state.symbols[i].monthLow = payload.monthLow;
                    if (payload._52weekLow) state.symbols[i]._52weekLow = payload._52weekLow;
                }
            }
        }
    },
    actions: {
        async loadData(context, payload) {
            console.log('loadData', context, payload.symbol);
            let testMode = true;
            try {

                let res = {};
                if (testMode) {
                    res.data = payload.symbol == 'AMZN' ? AMZN : payload.symbol == 'NFLX' ? NFLX : ''
                } else {
                    res = await axios({
                        method: 'get',
                        url: `/query?function=${apiFields.FUNCTION}&symbol=${payload.symbol}&apikey=${apiFields.API_KEY}`,
                    })
    
                    if (res.status !== 200) {
                        throw Error('Something went wrong while loading data')
                    }
                }
                
                let monthKeys = Object.keys(res.data['Time Series (Daily)']);
                monthKeys = monthKeys.splice(0, 30);

                let monthLow, current;

                for (let i = 0; i < monthKeys.length; i++) {
                    let dayKey = monthKeys[i];

                    if (i == 0) {
                        current = Number(res.data['Time Series (Daily)'][dayKey]["4. close"]);
                    }

                    if (!monthLow) {
                        monthLow = Number(res.data['Time Series (Daily)'][dayKey]['4. close']);
                    } else if (monthLow > Number(res.data['Time Series (Daily)'][dayKey]['4. close'])) {
                        monthLow = Number(res.data['Time Series (Daily)'][dayKey]['4. close']);
                    }
                }

                console.log({monthLow}, {current})

                payload.currentPrice = current;
                payload.monthLow = monthLow;

                context.commit(UPDATE_SYMBOL, payload)

            } catch (error) {
                console.log(error);
            }
            
        }
    }
})