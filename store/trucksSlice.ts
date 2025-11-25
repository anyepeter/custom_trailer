import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Truck } from "@prisma/client";

// Type for truck with serialized Decimal fields
type TruckWithNumbers = Omit<Truck, "actualPrice" | "regularPrice"> & {
  actualPrice?: number | null;
  regularPrice?: number | null;
};

interface TrucksState {
  trucks: TruckWithNumbers[];
  loading: boolean;
  error: string | null;
}

const initialState: TrucksState = {
  trucks: [],
  loading: false,
  error: null,
};

const trucksSlice = createSlice({
  name: "trucks",
  initialState,
  reducers: {
    setTrucks: (state, action: PayloadAction<TruckWithNumbers[]>) => {
      state.trucks = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setTrucks, setLoading, setError } = trucksSlice.actions;
export default trucksSlice.reducer;
