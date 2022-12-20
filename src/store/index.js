import { createStore } from 'vuex'
import { UPDATE_SYMBOLS, UPDATE_SORT } from './mutation-types'
import axios from '../api';
import apiFields from '../constants'
import AMZN from '../testData/AMZN'
import NFLX from '../testData/NFLX'

// Create a new store instance.
export default createStore({
    state() {
        return {
            symbols: [],
            sortData: {
                priceDiff: {
                    order: 'asc'
                },
                pricePerc: {
                    order: 'asc'
                },
                _52weekDiff: {
                    order: 'asc'
                },
                _52weekPerc: {
                    order: 'asc'
                }
            }
        }
    },
    getters: {
        symbols(state) {
            return state.symbols;
        },
        getSortOrder: (state) => (field) => {
            return state.sortData[field].order;
          }
    },
    mutations: {
        [UPDATE_SYMBOLS](state, payload) {
            state.symbols = payload;
        },
        [UPDATE_SORT](state, payload) {
            state.sortData[payload.sortArg].order = payload.order;
        }
    },
    actions: {
        async loadData(context) {
            try {
                // ngrok-skip-browser-warning
                const res = await axios({
                    method: 'get',
                    url: `https://63bf-142-198-109-155.ngrok.io/api/fetchAll`,
                    headers: {
                        'ngrok-skip-browser-warning': true
                    }
                })
                if (res.status !== 200) {
                    throw Error('Something went wrong while loading data')
                }
                context.commit(UPDATE_SYMBOLS, res.data)
                
            } catch (error) {
                console.log('loadData error', error);
            }
        },
        sortSymbols(context, data) {
            try {
                if (!data) {
                    data = {
                        sortArg: 'priceDiff',
                        order: 'asc'
                    }
                }
                let symbols = JSON.parse(JSON.stringify(context.state.symbols));
                symbols.sort((a,b) => {
                    if (data.order == "asc") {
                        return a[data.sortArg] - b[data.sortArg];
                    } else {
                        return b[data.sortArg] - a[data.sortArg];
                    }
                })
                context.commit(UPDATE_SYMBOLS, symbols);
                context.commit(UPDATE_SORT, data);
                
            } catch (error) {
                console.log('sortSymbols error', error);
            }
        }
    }
})
