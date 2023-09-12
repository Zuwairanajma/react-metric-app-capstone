import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  stocks: [],
  loading: false,
  selectedStock: '',
  searchTerm: '',
  error: '',
};

export const fetchStocks = createAsyncThunk('stocks/fetchStocks', () => (
  axios.get('https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=100&apikey=cb47745d26d092ee7f64001566830876')
    .then((response) => response.data.map((stock) => ({
      id: stock.symbol,
      companyName: stock.companyName,
      price: stock.price, // Fixed typo here
      volume: stock.volume,
      beta: stock.beta,
      lastAnnualDividend: stock.lastAnnualDividend, // Fixed typo here
      marketCap: stock.marketCap,
    })))
));

export const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    select: (state, action) => {
      state.selectedStock = action.payload;
    },
    search: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStocks.pending, (state) => {
      state.loading = true; // Fixed typo here
    });
    builder.addCase(fetchStocks.fulfilled, (state, action) => {
      state.loading = false;
      state.stocks = action.payload;
      state.error = '';
    });
    builder.addCase(fetchStocks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { select, search } = stockSlice.actions;
export default stockSlice.reducer;
