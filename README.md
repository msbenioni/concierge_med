# Compass Connect

A modern web application for Compass Connect - an independent, non-medical concierge service supporting NZ & AU patients traveling overseas for surgery.

## 🌟 About

Compass Connect specializes in coordinating group travel and non-medical support for patients seeking medical procedures abroad. We handle all travel logistics while our partner hospitals manage medical care.

**What we provide:**
- Group flight coordination
- Airport transfers and accommodation logistics
- On-the-ground concierge support
- Emotional support and companionship
- Travel coordination and planning

**What we don't provide:**
- Medical advice or assessments
- Surgical procedures or clinical care
- Medical aftercare or follow-up

## 🚀 Features

### Core Application
- **Modern React Application** built with Vite
- **Responsive Design** using Tailwind CSS
- **Component Architecture** with shadcn/ui components
- **Multi-page Navigation** with React Router
- **Interactive Forms** with real-time validation
- **Beautiful Animations** with Framer Motion
- **Progressive Web App** support with manifest

### Admin Panel
- **Fully Editable Spreadsheet-Style Table** for user management
- **Real-time Field Editing** - Click any cell to edit
- **Booking Status Management** - Track confirmed, pending, and to-be-requested bookings
- **Travel Details Tracking** - Flight confirmations, accommodations, notes
- **User Notification System** - Monitor questionnaire completions
- **Trip Management** - Create, edit, and delete group trips
- **Hospital Reference Generation** - Automated reference codes

### Booking System
- **Multi-Step Booking Form** with validation
- **User Details Capture** - Initial step before questionnaire
- **Hospital Questionnaire Integration** - Direct hospital questionnaire access
- **Group Trip Management** - Minimum traveler requirements (4 travelers)
- **Stripe-Ready Payment Processing** - Currency-neutral pricing

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **Routing:** React Router DOM with future flags
- **Forms:** React Hook Form, Zod validation
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Development:** ESLint, TypeScript
- **State Management:** React hooks, local state
- **PWA:** Web App Manifest

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd compass-connect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run typecheck` - Run TypeScript type checking

## 🏗️ Project Structure

```
src/
├── components/
│   ├── compass-connect/          # Reusable UI components
│   │   ├── MultiStepBookingForm.jsx
│   │   ├── HeroSection.jsx
│   │   ├── TripCard.jsx
│   │   └── ...
│   └── ui/                       # shadcn/ui components
├── pages/                        # Page components
│   ├── Admin.jsx                 # Admin panel with editable table
│   ├── Home.jsx                  # Landing page
│   ├── HowItWorks.jsx            # Process explanation
│   ├── FAQ.jsx                   # Frequently asked questions
│   ├── Trips.jsx                 # Available trips
│   └── Booking.jsx               # Booking form
├── constants/
│   └── index.js                  # Shared configuration constants
├── utils/
│   └── index.ts                  # Utility functions
├── Layout.jsx                    # Main layout component
├── App.jsx                       # Root app component
└── main.jsx                      # App entry point
```

## 🔧 Configuration

### Shared Constants
The project uses a centralized constants file (`src/constants/index.js`) for:
- **Trip Configuration**: Minimum travelers (4), default price (4000), destination
- **Status Options**: Trip statuses, booking statuses, user statuses
- **Hospital References**: Prefix for automated reference generation

### Admin Panel Features
- **Editable Spreadsheet Table**: Excel-like interface for data management
- **Real-time Updates**: All changes save immediately
- **Column Width Optimization**: Wide columns for phone, dates, and notes
- **Date Formatting**: dd/mmm/yy format for travel dates
- **Status Management**: Color-coded status badges and dropdowns

## 🌐 Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to any web hosting service:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages
   - Or any static hosting service

## 📝 Important Notes

- This is a **non-medical concierge service** - all medical care is provided by partner hospitals
- The fee covers **travel and concierge services only** (currency-neutral for Stripe)
- Medical fees are paid **directly to hospitals**
- Group travel requires **minimum 4 travelers** to proceed
- **Admin panel** provides full trip and user management capabilities
- **Real-time editing** allows immediate updates to all data fields

## 🔧 Recent Updates

### Latest Improvements
- **Admin Panel Redesign**: Card-based layout converted to Excel-style spreadsheet
- **Fully Editable Fields**: All table cells are now editable with real-time updates
- **Optimized Column Widths**: Extra-wide columns for phone (288px), dates (320px), and notes (256px)
- **Date Format Standardization**: dd/mmm/yy format for all travel dates
- **Shared Constants System**: Centralized configuration for maintainability
- **Currency-Neutral Pricing**: Removed hardcoded currency for Stripe integration
- **Import Path Fixes**: Resolved all module resolution issues
- **TypeScript Error Fixes**: Added proper fallback values for parseInt operations

### Technical Improvements
- **React Router Future Flags**: Enabled v7 compatibility features
- **PWA Manifest**: Added web app manifest for mobile support
- **Error Handling**: Improved null safety and error boundaries
- **Code Organization**: Better separation of concerns with constants

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary and confidential to Compass Connect.
