import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  cities: Record<string, boolean>;
}

const initialState: FavoriteState = {
  cities: {
    NewYork: false,
    London: false,
    Tokyo: false,
  },
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      state.cities[action.payload] = !state.cities[action.payload];
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
