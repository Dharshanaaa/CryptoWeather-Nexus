import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { fetchWeatherData, fetchWeatherForecast } from "@/lib/api/weather-api"

interface WeatherState {
  locations: Record<string, any>
  history: Record<string, any[]>
  loading: boolean
  error: string | null
}

const initialState: WeatherState = {
  locations: {},
  history: {},
  loading: false,
  error: null,
}

// Helper function to generate a unique key for latitude and longitude
const getLocationKey = (lat: number, lon: number) => `${lat},${lon}`

// Async thunk for fetching current weather data
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const response = await fetchWeatherData(lat, lon)
    return { lat, lon, data: response }
  }
)

// Async thunk for fetching weather forecast (as historical data substitute)
export const fetchWeatherHistory = createAsyncThunk(
  "weather/fetchWeatherHistory",
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const response = await fetchWeatherForecast(lat, lon)
    return { lat, lon, data: response }
  }
)

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
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<{ lat: number; lon: number; data: any }>) => {
        state.loading = false
        const key = getLocationKey(action.payload.lat, action.payload.lon)
        state.locations[key] = action.payload.data
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch weather data"
      })
      .addCase(fetchWeatherHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeatherHistory.fulfilled, (state, action: PayloadAction<{ lat: number; lon: number; data: any[] }>) => {
        state.loading = false
        const key = getLocationKey(action.payload.lat, action.payload.lon)
        state.history[key] = action.payload.data
      })
      .addCase(fetchWeatherHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch weather history"
      })
  },
})

export default weatherSlice.reducer