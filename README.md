# 🌍 World Digital Clocks & Weather Dashboard

A high-performance, real-time world clock and weather dashboard. Originally conceived as a static HTML project, this version has been completely re-engineered using **Next.js 15**, **TypeScript**, and **Tailwind CSS v4**.

🔗 **Repo:** [github.com/almustansir/world-clock](https://github.com/almustansir/world-clock)  
🌐 **Live Demo:** [world-clock-amber-three.vercel.app](https://world-clock-amber-three.vercel.app)

## 🚀 Features

- **Real-Time Synchronization**: Accurate time tracking for global cities using the `Intl` API.
- **Live Weather Integration**: Real-time temperature and weather conditions fetched via the Open-Meteo API.
- **Format Toggle**: Easily switch between 12-hour and 24-hour time formats globally.
- **Glassmorphism Design**: Modern, frosted-glass UI with hover scaling effects and a dynamic animated gradient background.
- **Client-Side Hydration**: Optimized to prevent hydration mismatches and handle timezone formatting directly in the browser.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 (CSS-first engine)
- **Language**: TypeScript (Strict type safety)
- **API**: Open-Meteo (Free weather data)

## 📁 Project Structure

The project follows a modular `src` directory pattern for better maintainability and professional organization:

```text
├── src/
│   ├── app/             # Main application routes & global styles
│   ├── components/      # Reusable UI components (ClockCard.tsx)
│   ├── constants/       # City data and coordinates
│   └── types/           # TypeScript definitions and interfaces
├── public/              # Static assets and icons
└── next.config.ts       # Next.js configuration
```

## 🏁 Getting Started

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/almustansir/world-clock.git](https://github.com/almustansir/world-clock.git)
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## 📈 Roadmap & WIP

This project is currently a **work in progress**. Planned updates include:

- [ ] **Search Functionality**: Allow users to add any city in the world dynamically.
- [ ] **Persistent Settings**: Save 12/24h preference and selected cities to `localStorage`.
- [ ] **Visual Weather Icons**: Add dynamic icons/emojis based on weather codes (e.g., ☀️, 🌧️).
- [ ] **Unit Toggle**: Support for Fahrenheit (°F) as well as Celsius (°C).

---

_This is a **work in progress** as I continue to add new features and polish the experience._
