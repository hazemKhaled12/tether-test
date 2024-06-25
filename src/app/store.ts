import { configureStore } from "@reduxjs/toolkit";
import orderBookSlice from "../features/orderBook/orderBookSlice";

// const logger = require("redux-logger").createLogger();

export const store = configureStore({
  reducer: {
    orderBook: orderBookSlice,
  },
  // middleware: (defaults) => defaults().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
