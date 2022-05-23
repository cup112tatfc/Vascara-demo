import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cart } from 'types/type.cart';

const baseUrl = 'https://fake-server-for-project.herokuapp.com/api/cartUsers';

export const fetchGetCart = createAsyncThunk('cart/fetchGetCart', async (id: string) => {
  const response = await axios.get<Cart>(`${baseUrl}?id=${id}`);
  return response.data;
});
export const fetchCeateCart = createAsyncThunk('cart/fetchCeateCart', async (newCart: Cart) => {
  const response = await axios
    .post(`${baseUrl}`, newCart)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(response);
});

const initialState = {
  status: 'idle',
  cart: {} as Cart,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state, action) => {
      state.cart = {} as Cart;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetCart.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchGetCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchGetCart.rejected, (state, action) => {
        state.status = 'rejected';
      })
      .addCase(fetchCeateCart.fulfilled, (state, action) => {});
  },
});
export default cartSlice;