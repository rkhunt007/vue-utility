import { createStore } from 'vuex'
import { UPDATE_SYMBOLS } from './mutation-types'
import axios from '../api';
import apiFields from '../constants'
import AMZN from '../testData/AMZN'
import NFLX from '../testData/NFLX'

// Create a new store instance.
export default createStore({
    state() {
        return {
            symbols: []
        }
    },
    getters: {
        symbols(state) {
            return state.symbols
        }
    },
    mutations: {
        [UPDATE_SYMBOLS](state, payload) {
            console.log('UPDATE_SYMBOLS', payload);
            state.symbols = payload;
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
        }
    }
})
