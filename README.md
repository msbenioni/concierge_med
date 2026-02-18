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
- **Semantic Color System** - Luxurious black, ivory, and rose-gold theme throughout

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

### Design System
- **Centralized Color Constants** - Semantic naming system for maintainability
- **Consistent Theme** - Black, ivory, and rose-gold palette across all components
- **Glass Morphism Effects** - Modern backdrop blur and transparency
- **Responsive Animations** - Smooth transitions and micro-interactions
- **Component Library** - Reusable UI components with consistent styling

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
- **Color System:** Centralized semantic color constants

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
│   │   ├── StatusBadge.jsx
│   │   ├── CTASection.jsx
│   │   ├── DisclaimerBlock.jsx
│   │   ├── WhyGroupTravel.jsx
│   │   ├── TripHighlights.jsx
│   │   ├── StepTimeline.jsx
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
│   ├── colors.js                 # Centralized semantic color system
│   └── index.js                  # Shared configuration constants
├── utils/
│   └── index.ts                  # Utility functions
├── Layout.jsx                    # Main layout component
├── globals.css                   # Global styles with CSS variables
├── App.jsx                       # Root app component
└── main.jsx                      # App entry point
```

## 🔧 Configuration

### Semantic Color System
The project uses a centralized color constants file (`src/constants/colors.js`) for:
- **Semantic Naming**: Purpose-based color names (e.g., `BACKGROUND_PRIMARY`, `ACCENT_PRIMARY`)
- **Theme Consistency**: Black, ivory, and rose-gold palette throughout
- **Maintainability**: Single source of truth for all colors
- **CSS Variables**: Global CSS variables matching semantic names
- **Component Integration**: All components use semantic color imports

### Shared Constants
- **Trip Configuration**: Minimum travelers (4), default price (4000), destination
- **Status Options**: Trip statuses, booking statuses, user statuses
- **Hospital References**: Prefix for automated reference generation

### Design Features
- **Glass Morphism**: Modern backdrop blur and transparency effects
- **Gradient Overlays**: Beautiful color gradients for visual hierarchy
- **Shadow System**: Consistent shadow depths for elevation
- **Border System**: Subtle borders for content separation
- **Animation System**: Smooth transitions and micro-interactions

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
- **Semantic color system** ensures consistent theming across the entire application

## 🔧 Recent Updates

### Latest Improvements
- **Complete Color System Refactor**: Implemented semantic color naming system
- **Centralized Color Constants**: All colors now use purpose-based semantic names
- **Theme Consistency**: Black, ivory, and rose-gold palette throughout
- **Glass Morphism Design**: Modern backdrop blur and transparency effects
- **Component Library Updates**: All components use semantic color imports
- **CSS Variables Update**: Global styles renamed to match semantic names
- **Manifest Theme Update**: PWA manifest colors aligned with theme
- **Animation Enhancements**: Smooth transitions and hover effects
- **Error Resolution**: Fixed all color-related import/export issues

### Technical Improvements
- **Code Organization**: Better separation of concerns with constants
- **Import Path Fixes**: Resolved all module resolution issues
- **TypeScript Error Fixes**: Added proper fallback values for operations
- **Performance Optimizations**: Efficient color constant usage
- **Maintainability Boost**: Single source of truth for all colors

### Design System Features
- **Semantic Naming**: Colors named by purpose (e.g., `BACKGROUND_PRIMARY`, `ACCENT_PRIMARY`)
- **Alpha Variants**: Transparency levels for hover states and overlays
- **Gradient System**: Pre-defined gradients for visual hierarchy
- **Shadow System**: Consistent shadow depths for elevation
- **Border System**: Subtle borders for content separation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary and confidential to Compass Connect.
