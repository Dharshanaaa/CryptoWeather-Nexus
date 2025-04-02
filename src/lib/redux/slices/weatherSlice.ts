import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { fetchWeatherData, fetchCityWeatherHistory } from "@/lib/api/weather-api"

interface WeatherState {
  cities: Record<string, any>
  history: Record<string, any[]>
  loading: boolean
  error: string | null
}

const initialState: WeatherState = {
  cities: {},
  history: {},
  loading: false,
  error: null,
}

// Async thunk for fetching weather data
export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (city: string) => {
  const response = await fetchWeatherData(city)
  return { city, data: response }
})

// Async thunk for fetching weather history
export const fetchWeatherHistory = createAsyncThunk("weather/fetchWeatherHistory", async (city: string) => {
  const response = await fetchCityWeatherHistory(city)
  return { city, data: response }
})

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<{ city: string; data: any }>) => {
        state.loading = false
        state.cities[action.payload.city] = action.payload.data
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch weather data"
      })
      .addCase(fetchWeatherHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeatherHistory.fulfilled, (state, action: PayloadAction<{ city: string; data: any[] }>) => {
        state.loading = false
        state.history[action.payload.city] = action.payload.data
      })
      .addCase(fetchWeatherHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch weather history"
      })
  },
})

export default weatherSlice.reducer

