import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { fetchCryptoNews } from "@/lib/api/news-api"

interface NewsState {
  articles: any[]
  loading: boolean
  error: string | null
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
}

// Async thunk for fetching news
export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await fetchCryptoNews()
  return response
})

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false
        state.articles = action.payload
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch news"
      })
  },
})

export default newsSlice.reducer

