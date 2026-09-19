# 💍 Royal Wedding Invitation Website

An interactive, responsive wedding invitation web application built with **React**, **Vite**, and **Tailwind CSS**.

---

## ✨ Features

- **💌 3D Wax-Sealed Royal Envelope**: Click-to-unseal interactive opening with realistic wax stamp animation and particle sparkles.
- **🎭 Velvet Curtain Reveal**: Silky crimson-rose curtains with golden tassels that part smoothly on scroll.
- **🎨 Studio Ghibli Story Cards**: Custom watercolor anime portraits for the Bride & Groom, with quotes and "Our Journey" love milestones.
- **⏱️ Live Muhurtham Countdown**: Dynamic countdown timer to the wedding date.
- **📅 Events Timeline & Calendar Sync**: Sangeet, Reception, and Muhurtham details with **Add to Google Calendar** and **.ICS download** for Apple Calendar.
- **🗺️ Mahal Location & Maps**: Interactive Google Maps embed with **"Open in Google Maps"**, **"Open in Apple Maps"**, and **"Copy Address"**.
- **💖 Guest Blessings Guestbook**: Interactive form for attendees to leave loving wishes with celebratory confetti bursts.
- **🎵 Romantic Background Melody**: Ambient harp/celesta music player with soundwave visualizer.
- **🌸 Floating Blossom Petals**: Canvas physics animation with drifting cherry blossom and jasmine petals.

---

## 🛠️ Customization

All wedding details (names, dates, venue, coordinates, quotes, story) are centralized in:
```
src/data/weddingData.js
```
Simply edit this file to personalize the website for your wedding.

---

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

---

## ☁️ Deploying to Vercel

### Option 1: Vercel CLI
```bash
npx vercel
```

### Option 2: Push to GitHub & Connect to Vercel
1. Push this project to your GitHub account.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository — Vercel will automatically detect Vite and deploy in seconds!
