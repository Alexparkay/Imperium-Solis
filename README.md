# Imperium Solis Dashboard

<br/>
<p align="center">
    <a href="#" target="_blank">
        <img width="60%" src="logo.jpg" alt="Imperium Solis Logo">
    </a>
</p>

<br/>
<p align="center">
    <a href="LICENSE" target="_blank"><img src="https://img.shields.io/github/license/Alexparkay/Imperium-Solis" alt="GitHub license"></a>
    <a><img src="https://img.shields.io/badge/version-1.0.0-blue" alt="version"></a>
    <a><img src="https://img.shields.io/github/stars/Alexparkay/Imperium-Solis" alt="GitHub stars"></a>
    <a><img src="https://img.shields.io/github/languages/top/Alexparkay/Imperium-Solis" alt="language"></a>
    <a><img src="https://img.shields.io/github/forks/Alexparkay/Imperium-Solis" alt="forks"></a>
</p>
<br/>

**Imperium Solis** is a comprehensive solar energy management and facility analysis dashboard built with modern web technologies. This application provides powerful tools for solar panel potential analysis, energy usage estimation, facility data management, and automated outreach tracking.

<br/>
<p align="center">
    <img width="80%" src="preview-optimized.gif" alt="Dashboard Preview">
</p>
<br/>

## 🌟 Features

### 🏢 Facility Management
- **Facility Database**: Comprehensive facility data storage and management
- **Data Enrichment**: Advanced facility information enhancement and AI analysis
- **Smart Search**: Powerful filtering and search capabilities

### ⚡ Energy Analysis
- **Energy Usage Estimation**: Advanced algorithms for power consumption analysis
- **Solar Panel Potential**: Site suitability analysis and solar capacity calculations
- **ROI Calculations**: Financial impact analysis and payback period estimates

### 📧 Outreach & Communication
- **Email Automation**: Automated lead nurturing and communication workflows
- **Outreach Tracking**: Campaign performance monitoring and analytics
- **Lead Management**: Comprehensive prospect tracking and conversion metrics

### 📊 Analytics & Visualization
- **Interactive Charts**: Beautiful data visualization with Recharts
- **Real-time Dashboards**: Live performance metrics and KPIs
- **Geographic Mapping**: Location-based facility analysis and mapping

## 💎 Tech Stack

### Frontend
- ⚡️ **React 18** with TypeScript and Vite
- 🎯 **React Router v6** for declarative routing
- 📋 **React Query v5** for seamless data fetching
- 🎨 **Tailwind CSS v3** + **DaisyUI v4** for modern styling
- 🕶 **Material UI v5** for complex components
- ✨ **Framer Motion** for smooth animations
- 📊 **Recharts v2** for data visualization
- 📅 **FullCalendar** for scheduling and calendar features
- 🗺️ **React Simple Maps** for geographic visualization

### Backend
- 🚀 **Node.js** with **Express** and TypeScript
- 🔒 **CORS** and **Helmet** for security
- 📝 **Morgan** for logging
- 🧪 **Jest** for testing

## 🚀 Getting Started

### Prerequisites
- Node.js 20.11.0 LTS or higher
- npm or yarn package manager

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The API will be available at [http://localhost:5000](http://localhost:5000)

## 🌐 Deployment

### Vercel Deployment (Recommended)

This project is optimized for Vercel deployment with automatic builds and deployments.

#### Frontend Deployment
```bash
cd frontend
npm run build
```

#### Backend Deployment
The backend is configured for serverless deployment on Vercel with the included `vercel.json` configuration.

### Environment Variables

Create `.env` files in both frontend and backend directories:

**Frontend (.env)**
```bash
VITE_API_URL=your_api_endpoint
```

**Backend (.env)**
```bash
PORT=5000
NODE_ENV=production
```

## 🏗️ Project Structure

```
imperium-solis/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── api/            # API integration
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── dist/               # Build output
├── backend/                 # Node.js API server
│   ├── src/                # Source code
│   ├── api/                # API routes
│   └── public/             # Static files
└── docs/                   # Documentation
```

## 🎨 Design System

### Theme Configuration
- **Dark Glassmorphic UI** with sophisticated visual depth
- **Modern Color Palette** optimized for energy industry applications
- **Responsive Grid System** with mobile-first approach
- **Accessible Components** following WCAG 2.1 AA standards

### Colors
```typescript
colors: {
  background: {
    primary: '#0A0A0A',    // Near-black base
    secondary: '#1A1A1A',  // Card background
    accent: '#2A2A2A',     // Hover states
  },
  text: {
    primary: '#FFFFFF',    // Headings
    secondary: '#B3B3B3',  // Body text
    muted: '#666666',      // Less important text
  },
  accent: {
    primary: '#3B82F6',    // Blue
    secondary: '#10B981',   // Green
    warning: '#F59E0B',    // Orange
  }
}
```

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test
```

## 📈 Performance Optimizations

- **Code Splitting**: Automatic chunk splitting for optimal loading
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Responsive image handling
- **Caching**: Intelligent browser and CDN caching strategies
- **Bundle Analysis**: Optimized bundle sizes with tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Alex Parker** - [GitHub](https://github.com/Alexparkay)

Project Link: [https://github.com/Alexparkay/Imperium-Solis](https://github.com/Alexparkay/Imperium-Solis)

---

<p align="center">
  <i>Built with ❤️ for the renewable energy industry</i>
</p>