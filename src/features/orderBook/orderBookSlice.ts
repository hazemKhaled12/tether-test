import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../app/store";
interface Order {
  price: number;
  count: number;
  amount: number;
}

interface BookEntry {
  price: number;
  count: number;
  amount: number;
}
interface OrderBookState {
  bids: Order[];
  asks: Order[];
  isWebSocketOpen: boolean;
}

const initialState: OrderBookState = {
  bids: [],
  asks: [],
  isWebSocketOpen: false,
};

const orderBookSlice = createSlice({
  name: "orderBook",
  initialState,
  reducers: {
    setOrderBook: (
      state,
      action: PayloadAction<{ bids: Order[]; asks: Order[] }>
    ) => {
      const { bids, asks } = action.payload;
      state.bids = bids;
      state.asks = asks;
    },
    updateBid: (state, action: PayloadAction<Order>) => {
      const { price, count, amount } = action.payload;
      const index = state.bids.findIndex((bid) => bid.price === price);
      if (index > -1) state.bids[index].amount = amount;
      else {
        state.bids.push({ price, count, amount });
        state.bids.sort((a, b) => b.price - a.price);
      }
    },
    deleteBid: (state, action: PayloadAction<Order>) => {
      const { price } = action.payload;
      state.bids = state.bids.filter((bid) => bid.price !== price);
    },
    updateAsk: (state, action: PayloadAction<Order>) => {
      const { price, count, amount } = action.payload;

      const index = state.asks.findIndex((ask) => ask.price === price);
      if (index > -1) state.asks[index].amount = amount;
      else {
        state.asks.push({ price, count, amount });
        state.asks.sort((a, b) => a.price - b.price);
      }
    },
    deleteAsk: (state, action: PayloadAction<Order>) => {
      const { price } = action.payload;
      state.asks = state.asks.filter((ask) => ask.price !== price);
    },
    setIsWebSocketOpen: (state, action: PayloadAction<boolean>) => {
      state.isWebSocketOpen = action.payload;
    },
  },
});

export const handleOrderBookData = (data: any) => {
  return async (dispatch: AppDispatch) => {
    if (Array.isArray(data[1] && data[1][0] && Array.isArray(data[1][0]))) {
      // Initial order book snapshot
      const bookEntries = data[1];
      if (Array.isArray(bookEntries[0])) {
        const bids: BookEntry[] = [];
        const asks: BookEntry[] = [];
        bookEntries.forEach((entry: [number, number, number]) => {
          const [price, count, amount] = entry;
          if (amount > 0) {
            bids.push({ price, count, amount });
          } else {
            asks.push({ price, count, amount: Math.abs(amount) });
          }
        });
        dispatch(setOrderBook({ bids, asks }));
      }
    } else if (data[1] === "hb") {
      // Heartbeat message
      return;
    } else if (Array.isArray(data[1]) && !Array.isArray(data[1][0])) {
      // Order-Book Update message
      const [price, count, amount] = data[1];
      //handle delete
      if (count === 0) {
        if (amount === 1) dispatch(deleteAsk({ price, count, amount }));
        if (amount === -1) dispatch(deleteBid({ price, count, amount }));
      }
      //handle update
      if (count > 0) {
        if (amount > 0) dispatch(updateBid({ price, count, amount }));
        if (amount < 0)
          dispatch(updateAsk({ price, count, amount: Math.abs(amount) }));
      }
    }
  };
};

export const {
  setOrderBook,
  updateBid,
  updateAsk,
  deleteAsk,
  deleteBid,
  setIsWebSocketOpen,
} = orderBookSlice.actions;

export default orderBookSlice.reducer;
