import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { fetchCryptoData, fetchCryptoHistory, fetchCryptoDetails } from "@/lib/api/crypto-api"

interface CryptoState {
  cryptos: Record<string, any>
  history: Record<string, any[]>
  details: Record<string, any>
  loading: boolean
  error: string | null
}

const initialState: CryptoState = {
  cryptos: {},
  history: {},
  details: {},
  loading: false,
  error: null,
}

// Async thunk for fetching crypto data
export const fetchCrypto = createAsyncThunk("crypto/fetchCrypto", async (cryptoId: string) => {
  const response = await fetchCryptoData(cryptoId)
  return { cryptoId, data: response }
})

// Async thunk for fetching crypto history
export const fetchCryptoHistoryData = createAsyncThunk("crypto/fetchCryptoHistory", async (cryptoId: string) => {
  const response = await fetchCryptoHistory(cryptoId)
  return { cryptoId, data: response }
})

// Async thunk for fetching crypto details
export const fetchCryptoDetailsData = createAsyncThunk("crypto/fetchCryptoDetails", async (cryptoId: string) => {
  const response = await fetchCryptoDetails(cryptoId)
  return { cryptoId, data: response }
})

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCrypto.fulfilled, (state, action: PayloadAction<{ cryptoId: string; data: any }>) => {
        state.loading = false
        state.cryptos[action.payload.cryptoId] = action.payload.data
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch crypto data"
      })
      .addCase(fetchCryptoHistoryData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCryptoHistoryData.fulfilled, (state, action: PayloadAction<{ cryptoId: string; data: any[] }>) => {
        state.loading = false
        state.history[action.payload.cryptoId] = action.payload.data
      })
      .addCase(fetchCryptoHistoryData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch crypto history"
      })
      .addCase(fetchCryptoDetailsData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCryptoDetailsData.fulfilled, (state, action: PayloadAction<{ cryptoId: string; data: any }>) => {
        state.loading = false
        state.details[action.payload.cryptoId] = action.payload.data
      })
      .addCase(fetchCryptoDetailsData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch crypto details"
      })
  },
})

export default cryptoSlice.reducer

