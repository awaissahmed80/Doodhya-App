import { createSlice } from '@reduxjs/toolkit'

const basketSlice = createSlice({
    name: 'basket',
    initialState: { items: [], type: null, area: null, start_date: null, shift: 'MORNING', days: []},   
    reducers: {       
        clear: (state ) => {        
            state.items = []   
            state.area = null   
            state.type = null   
            state.shift = null
            state.start_date = null
            state.days = []
             
        },
        setArea: (state, {payload}) => {
            state.area = payload
        },
        setType: (state, {payload}) => {
            state.type = payload
        },
        setOptions: (state, { payload }) => {
            let { area, days, start_date, shift, type } = payload
            state.area = area || null
            state.days = days || null
            state.start_date = start_date || null
            state.shift = shift || null
            state.type = type || null            
        },
        addItem: (state, {payload}) => {                               
            const all_items = [...state.items]
            const index = all_items.findIndex(x => x.item_id === payload?.item_id)            
            if(index > -1){
                state.items[index] = payload
            }else{
                state.items = [...state.items, payload]
            }            
        },
        removeItem: (state, {payload}) => {                               
            const all_items = [...state.items]            
            const index = all_items.findIndex(x => x.item_id === payload)            
            if(index > -1){
                all_items.splice(index, 1)
                state.items = all_items
            }            
        }
    }    
})

export const  basketActions  = basketSlice.actions
export default basketSlice.reducer
export const currentBasket = (state) => state.basket