# 🌍 World Digital Clock Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-Utility--First-38B2AC?logo=tailwind-css" />
  <img src="https://img.shields.io/badge/API-Open--Meteo-orange" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
  <img src="https://img.shields.io/badge/Status-Production%20Ready-success" />
</p>

<p align="center">
  A high-performance, real-time World Clock & Weather dashboard built with modern web technologies.
</p>

---

## ✨ Overview

## 🚀 Live Features

- **Dynamic Search:** Global city autocomplete via Open-Meteo Geocoding API.
- **Live Weather:** Real-time conditions & temp via specific lat/lon coordinates.
- **Smart Sync:** 1s interval updates using `Intl.DateTimeFormat` for precise offsets.
- **Full Persistence:** `localStorage` for 12/24h, units (°C/°F), and custom city lists.
- **Modern UI:** Responsive, glassmorphic dark-mode design with Tailwind CSS.
- **SSR Optimized:** Client-side hydration guards to eliminate time-mismatch errors.

Built using **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**, it follows SSR-safe patterns and performance best practices.

---

<a href="https://world-clock-amber-three.vercel.app">
  🔗 <b>Live Demo:</b> https://world-clock-amber-three.vercel.app
</a>

---

## 🚀 Live Features

### 🌎 Dynamic Global Search

- Powered by Open-Meteo Geocoding API
- Autocomplete for 40,000+ cities worldwide
- Debounced API requests (400ms)

### 🕒 Real-Time Synchronization

- 1-second interval updates
- Accurate timezone handling via `Intl.DateTimeFormat`
- Automatic daylight saving adjustments

### 🌤️ Live Weather Integration

- Real-time temperature display
- Weather condition mapping using WMO codes
- °C / °F toggle with instant conversion

### 💾 Persistent User Settings

Stored using `localStorage`:

- 12-hour / 24-hour format
- Temperature unit preference
- Custom city list

### 🎨 Modern Glass UI

- Animated gradients
- Backdrop blur glassmorphism
- Fully responsive grid layout
- Dark mode aesthetic

### 🛡️ SSR & Hydration Safe

Client-only hydration guards prevent time mismatch errors between server and browser.

---

## 🛠️ Tech Stack

| Category             | Technology              |
| -------------------- | ----------------------- |
| **Framework**        | Next.js 14 (App Router) |
| **Language**         | TypeScript              |
| **Styling**          | Tailwind CSS            |
| **Weather API**      | Open-Meteo              |
| **Geocoding API**    | Open-Meteo              |
| **Deployment Ready** | Vercel                  |

---

## 📂 Project Structure

```bash
├── src/
│   ├── app/             # Main application routes (layout.tsx, page.tsx)
│   ├── components/      # UI components (ClockCard.tsx, CitySearch.tsx)
│   ├── constants/       # cities.ts (contains CITIES array)
│   └── types/           # TypeScript interfaces
├── public/              # Static assets not added yet
├── package.json
├── tsconfig.json
└── next.config.ts       # Or .js / .mjs depending on your setup
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/world-clock-nextjs.git
cd world-clock-nextjs
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

Visit:  
👉 http://localhost:3000

### 4️⃣ Build for Production

```bash
npm run build
```

---

## 📈 Roadmap

- [x] **Search Functionality**: Allow users to add any city in the world dynamically.
- [x] **Persistent Settings**: Save 12/24h preference and selected cities to `localStorage`.
- [x] **Visual Weather Icons**: Add dynamic icons/emojis based on weather codes (e.g., ☀️, 🌧️).
- [x] **Unit Toggle**: Support for Fahrenheit (°F) as well as Celsius (°C).

---

## 🧠 Key Implementation Details

### 🔒 Hydration Guard Pattern

```ts
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;
```

Prevents SSR/client time mismatch errors.

---

### ⏱️ Debounced API Search

```ts
useEffect(() => {
  const handler = setTimeout(() => {
    if (query) fetchCities(query);
  }, 400);

  return () => clearTimeout(handler);
}, [query]);
```

Optimizes API calls and improves UX.

---

## ⚡ Performance Highlights

- Minimal re-renders
- Memoized components
- Efficient interval cleanup
- Optimized API requests
- Lightweight dependencies

---

## 🧪 Future Enhancements

- WebSocket time sync
- Offline caching
- User accounts with cloud sync
- Theme customization panel
- World Map visualization

---

## 📄 License

This project is licensed under the MIT License.

---

### 👨‍💻 Developer

<p align="center">
  <b>Samit_08</b><br/>
  <a href="https://github.com/almustansir">GitHub Profile</a> •
  <a href="https://github.com/almustansir/world-clock">Project Repository</a>
</p>

<p align="center">
  If you found this useful, consider ⭐ starring the repository.
</p>
