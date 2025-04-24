import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(p => p._id === item._id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(p => p._id === action.payload.id);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(p => p._id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      } else if (item) {
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
        state.items = state.items.filter(i => i._id !== item._id);
      }
    },

    subTotal: (state) => {
      let totalQty = 0;
      let totalPrice = 0;
      state.items.forEach(item => {
        totalQty += item.quantity;
        totalPrice += item.quantity * item.price;
      });
      state.totalQuantity = totalQty;
      state.totalPrice = totalPrice;
    },


    clearCart: (state) => {
      state.items = [];
    }
    
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  subTotal,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
