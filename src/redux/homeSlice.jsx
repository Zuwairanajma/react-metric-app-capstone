import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  stocks: [],
  loading: false,
  selectedStock: '',
  searchTerm: '',
  error: '',
};

export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async () => {
  try {
    const response = await fetch('https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=100&apikey=cb47745d26d092ee7f64001566830876');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data.map((stock) => ({
      id: stock.symbol,
      companyName: stock.companyName,
      price: stock.price,
      volume: stock.volume,
      beta: stock.beta,
      lastAnnualDividend: stock.lastAnnualDividend,
      marketCap: stock.marketCap,
    }));
  } catch (error) {
    throw new Error('An error occurred while fetching the data');
  }
});

export const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    select: (state, action) => ({ ...state, selectedStock: action.payload }),
    search: (state, action) => ({ ...state, searchTerm: action.payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStocks.pending, (state) => ({ ...state, loading: true }));
    builder.addCase(fetchStocks.fulfilled, (state, action) => ({
      ...state, loading: false, stocks: action.payload, error: '',
    }));
  },
});

export const { select, search } = stockSlice.actions;
export default stockSlice.reducer;
