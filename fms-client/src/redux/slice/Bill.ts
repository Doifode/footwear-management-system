import { createSlice } from "@reduxjs/toolkit";

const BillSlice = createSlice({
    initialState: {
        activeBillProduct: [],
        totalValues: {
            itemsValue: 0,
            payableValue: 0,
            totalValue: 0,
            discount: 0
        }
    },
    name: "BillSlice",
    reducers: {
        setActiveBillProduct: (state, actions) => {
            state.activeBillProduct = actions.payload.productList,
                state.totalValues = actions.payload.totalValues
        },
        clearActiveProduct: (state) => {
            state.activeBillProduct = [],
                state.totalValues = { discount: 0, itemsValue: 0, payableValue: 0, totalValue: 0 }
        }
    }
});

export const { setActiveBillProduct, clearActiveProduct } = BillSlice.actions;
export default BillSlice.reducer;
