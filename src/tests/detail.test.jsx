import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Detail from '../components/details';

// Mock the Redux store
const mockStore = configureStore([]);

describe('Detail Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      stocks: {
        selectedStock: '1', // Set the selectedStockId to match the test data
        stocks: [
          {
            id: '1', companyName: 'Company 1', price: 100.00, volume: 1000, beta: 1.5, lastAnnualDividend: 0.5, marketCap: 1000000,
          },
          {
            id: '2', companyName: 'Company 2', price: 200.00, volume: 2000, beta: 2.0, lastAnnualDividend: 0.6, marketCap: 2000000,
          },
        ],
      },
    });
  });

  it('renders stock details when selectedStockId is set', () => {
    render(
      <Provider store={store}>
        <Router>
          <Detail />
        </Router>
      </Provider>,
    );

    // Check if the company name and details are rendered
    expect(screen.getByText('Company 1')).toBeInTheDocument();
    expect(screen.getByText('Company financial information')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Volume')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('1.5')).toBeInTheDocument();
    expect(screen.getByText('Dividend')).toBeInTheDocument();
    expect(screen.getByText('0.5')).toBeInTheDocument();
    expect(screen.getByText('Market Cap')).toBeInTheDocument();
    expect(screen.getByText('1000000')).toBeInTheDocument();
  });

  it('displays "Data not loaded" when selectedStockId is not set', () => {
    // Set selectedStockId to null (no stock selected)
    store = mockStore({
      stocks: {
        selectedStock: null,
        stocks: [],
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Detail />
        </Router>
      </Provider>,
    );

    // Check if "Data not loaded" message is displayed
    expect(screen.getByText('Data not loaded')).toBeInTheDocument();
  });
});
