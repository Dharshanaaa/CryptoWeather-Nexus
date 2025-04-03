### CryptoWeather Nexus Documentation

## GitHub Repository

**Repository URL:** [https://github.com/Dharshanaaa/CryptoWeather-Nexus.git](https://github.com/Dharshanaaa/CryptoWeather-Nexus.git)

This public repository contains the complete source code with commit history showing the development process of the CryptoWeather Nexus application.

## README Details

### Project Overview

CryptoWeather Nexus is a modern, multi-page dashboard that combines weather data, cryptocurrency information, and real-time notifications via WebSocket. The application provides users with up-to-date information on weather conditions for multiple cities, cryptocurrency prices and market data, and the latest crypto-related news headlines.

### Setup Instructions

1. **Clone the repository:**

```sh
git clone https://github.com/Dharshanaaa/CryptoWeather-Nexus.git
cd CryptoWeather-Nexus
```

2. **Install dependencies:**

```sh
npm install
```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory with the following variables:

```sh
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_newsdata_api_key
```

4. **Run the development server:**

```sh
npm run dev
```

5. **Build for production:**

```sh
npm run build
```

6. **Start the production server:**

```sh
npm start
```

### Build Instructions

The application is built using Next.js with the following key technologies:

- **Next.js (v13+)**: For server-side rendering and file-based routing
- **React**: For UI components and hooks for state management
- **Redux**: For global state management with Redux Thunk for async operations
- **Tailwind CSS**: For styling and responsive design
- **WebSocket**: For real-time cryptocurrency price updates

To build the application for production:

1. Ensure all environment variables are properly set.
2. Run `npm run build` to create an optimized production build.
3. Use `npm start` to start the production server.
4. For deployment on Vercel, simply connect your GitHub repository to Vercel and it will automatically build and deploy.
