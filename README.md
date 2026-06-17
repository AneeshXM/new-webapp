# 🏆 FIFA World Cup 2026 Website

A modern, responsive web application built with Next.js 15, TypeScript, and Tailwind CSS for tracking the FIFA World Cup 2026 tournament.

![FIFA World Cup 2026](https://img.shields.io/badge/FIFA-World%20Cup%202026-0033A0?style=for-the-badge&logo=football&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### Home Page
- 🎨 Hero banner with animated FIFA World Cup branding
- ⚡ Live matches section with real-time updates
- 📊 Latest scores and upcoming fixtures
- 🏅 Group standings with detailed statistics
- 👑 Top scorers leaderboard
- 📰 Latest football news

### Live Scores Page
- ⚽ Live, completed, and upcoming matches
- 🔄 Auto-refresh every 60 seconds
- 🔍 Filter by match status
- 📋 Match details with team information

### Standings Page
- 📊 World Cup group standings
- 📈 Team statistics (W/D/L, Goals, Points)
- 📋 Points table with goal difference
- 👑 Top scorers with assists and penalties

### Teams Page
- 🏳️ All 48 World Cup teams
- 👥 Squad information
- 📅 Fixtures and results
- 📊 Team statistics

### News Page
- 📰 Football news from multiple sources
- 🔍 Search and filtering
- 📂 Category-based organization

### UI Features
- 🌙 Dark/Light mode toggle
- 📱 Fully responsive design
- 🎨 FIFA-style sports theme
- ⏳ Loading skeletons
- ❌ Error handling
- ⚡ Auto-refresh live scores

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fifa-world-cup-2026
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```env
   API_FOOTBALL_KEY=your_api_key
   NEWS_API_KEY=your_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open the application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker compose up -d --build
   ```

2. **Access the application**
   
   Open [http://localhost:3000](http://localhost:3000)

3. **Stop the containers**
   ```bash
   docker compose down
   ```

## 🔑 API Keys (FREE - No Credit Card Required!)

The application works **without API keys** using mock data. But for real-time data, you can use these **free** services:

### ⚽ Football Data Sources

| Provider | Description | Sign Up | Free Limit |
|----------|-------------|---------|------------|
| **Football-Data.org** ⭐ | Best free option! | [football-data.org](https://www.football-data.org/) | 100/day, 10/min |
| **API-Football** | Premium data | [api-football.com](https://www.api-football.com/) | 100/day (trial*) |

### 📰 News Data Sources

| Provider | Description | Sign Up | Free Limit |
|----------|-------------|---------|------------|
| **GNews** ⭐ | Best free option! | [gnews.io](https://gnews.io/) | 100/day |
| **NewsData.io** | Real-time news | [newsdata.io](https://newsdata.io/) | 200/day |
| **Currents API** | Alternative news | [currentsapi.services](https://www.currentsapi.services/) | 600/day |

> **Note**: The application includes mock data fallbacks when API keys are not configured, allowing you to test the UI without external services.
>
> *API-Football trial requires credit card but provides excellent World Cup data.

## 📁 Project Structure

```
fifa-world-cup-2026/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/                # API routes
│   │   │   ├── scores/          # Match scores endpoint
│   │   │   ├── standings/       # Standings endpoint
│   │   │   ├── teams/           # Teams endpoint
│   │   │   └── news/            # News endpoint
│   │   ├── live-scores/         # Live scores page
│   │   ├── standings/           # Standings page
│   │   ├── teams/               # Teams page
│   │   ├── news/                # News page
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── features/            # Feature components
│   │       ├── hero/
│   │       │   └── Hero.tsx
│   │       ├── live-scores/
│   │       │   ├── MatchCard.tsx
│   │       │   └── LiveScoresSection.tsx
│   │       ├── standings/
│   │       │   ├── StandingsTable.tsx
│   │       │   └── TopScorers.tsx
│   │       ├── teams/
│   │       │   └── TeamCard.tsx
│   │       └── news/
│   │           ├── NewsCard.tsx
│   │           └── NewsSection.tsx
│   ├── lib/
│   │   ├── api/                 # API service layer
│   │   │   ├── football-api.ts
│   │   │   ├── news-api.ts
│   │   │   └── index.ts
│   │   └── utils/
│   │       └── cn.ts            # Utility functions
│   └── types/
│       └── index.ts             # TypeScript interfaces
├── public/                      # Static assets
├── Dockerfile                   # Production Dockerfile
├── Dockerfile.dev               # Development Dockerfile
├── docker-compose.yml           # Docker Compose config
├── .env.example                 # Environment variables template
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind CSS config
└── README.md                   # This file
```

## 🎨 Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| FIFA Gold | `#D4AF37` | Champions, highlights, awards |
| FIFA Blue | `#0033A0` | Primary brand color |
| FIFA Cyan | `#00D4FF` | Interactive elements, live indicators |
| Emerald | `#00FF87` | Success states, goals |
| Red | `#FF3B3B` | Live indicators, warnings |

### Typography

- **Display Font:** Space Grotesk (headings)
- **Body Font:** Outfit (paragraphs)
- **Mono Font:** JetBrains Mono (stats, scores)

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

### Adding New Features

1. Create components in `src/components/features/`
2. Add TypeScript interfaces in `src/types/`
3. Create API services in `src/lib/api/`
4. Add pages in `src/app/`
5. Update navigation in `src/components/layout/Header.tsx`

## 📊 Data Flow

```
External APIs (Football-Data.org, GNews)
         ↓
  Server Components / API Routes
         ↓
   React Components (Client)
         ↓
    User Interface
```

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `FOOTBALL_DATA_KEY` | Football-Data.org API key (FREE) | No |
| `GNEWS_API_KEY` | GNews API key (FREE) | No |
| `CURRENTS_API_KEY` | Currents API key (FREE) | No |
| `NEWSDATA_API_KEY` | NewsData.io API key (FREE) | No |
| `API_FOOTBALL_KEY` | API-Football (trial, requires credit card) | No |

> **All API keys are optional!** The app works with mock data without any keys.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [FIFA](https://www.fifa.com/) for the World Cup branding
- [Football-Data.org](https://www.football-data.org/) for free football data
- [GNews.io](https://gnews.io/) for free news API
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

**Built with ❤️ for football fans worldwide** ⚽🏆
