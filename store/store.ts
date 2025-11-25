import { configureStore } from "@reduxjs/toolkit";
import trucksReducer from "./trucksSlice";

export const store = configureStore({
  reducer: {
    trucks: trucksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
