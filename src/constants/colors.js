// Ultra-Premium Color Palette - Semantic Naming System
// Colors are named by their purpose, not their appearance

export const COLORS = {
  // Primary Colors - Named by purpose
  BACKGROUND_PRIMARY: '#000000',        // Main page background
  BACKGROUND_SECONDARY: '#0A0A0A',     // Dark sections/overlays
  BACKGROUND_TERTIARY: '#1A1A1A',      // Cards and interactive elements
  
  // Text Colors - Named by purpose
  TEXT_PRIMARY: '#FFFFFF',              // Main text color
  TEXT_SECONDARY: '#F8F8F8',           // Subtle text, less important
  TEXT_MUTED: '#FFFFF0',                // Very subtle text, placeholders
  TEXT_DISABLED: '#F5F5DC',            // Disabled/inactive text
  
  // Accent Colors - Named by purpose
  ACCENT_PRIMARY: '#D4AF37',            // Main accent (buttons, highlights)
  ACCENT_SECONDARY: '#B8941F',         // Secondary accent (hover states)
  ACCENT_SUBTLE: '#E6C75A',             // Subtle accent (borders, dividers)
  ACCENT_PALE: '#F4E5C2',               // Very subtle accent (backgrounds)
  
  // Opacity Variants - Named by purpose
  ACCENT_PRIMARY_ALPHA_10: 'rgba(212, 175, 55, 0.1)',   // Hover backgrounds
  ACCENT_PRIMARY_ALPHA_20: 'rgba(212, 175, 55, 0.2)',   // Active states
  ACCENT_PRIMARY_ALPHA_30: 'rgba(212, 175, 55, 0.3)',   // Emphasis areas
  ACCENT_PRIMARY_ALPHA_50: 'rgba(212, 175, 55, 0.5)',   // Overlays
  
  TEXT_PRIMARY_ALPHA_10: 'rgba(255, 255, 255, 0.1)',   // Very subtle text
  TEXT_PRIMARY_ALPHA_20: 'rgba(255, 255, 255, 0.2)',   // Placeholder text
  TEXT_PRIMARY_ALPHA_25: 'rgba(255, 255, 255, 0.25)',  // Subtle text
  TEXT_PRIMARY_ALPHA_30: 'rgba(255, 255, 255, 0.3)',   // Muted text
  TEXT_PRIMARY_ALPHA_40: 'rgba(255, 255, 255, 0.4)',   // Subtle dividers
  TEXT_PRIMARY_ALPHA_50: 'rgba(255, 255, 255, 0.5)',   // Secondary text
  TEXT_PRIMARY_ALPHA_60: 'rgba(255, 255, 255, 0.6)',   // Content text
  TEXT_PRIMARY_ALPHA_70: 'rgba(255, 255, 255, 0.7)',   // Important text
  TEXT_PRIMARY_ALPHA_80: 'rgba(255, 255, 255, 0.8)',   // Heading text
  TEXT_PRIMARY_ALPHA_90: 'rgba(255, 255, 255, 0.9)',   // Bright text
  
  BACKGROUND_PRIMARY_ALPHA_10: 'rgba(0, 0, 0, 0.1)',   // Very subtle overlays
  BACKGROUND_PRIMARY_ALPHA_20: 'rgba(0, 0, 0, 0.2)',   // Light overlays
  BACKGROUND_PRIMARY_ALPHA_30: 'rgba(0, 0, 0, 0.3)',   // Medium overlays
  BACKGROUND_PRIMARY_ALPHA_40: 'rgba(0, 0, 0, 0.4)',   // Card backgrounds
  BACKGROUND_PRIMARY_ALPHA_50: 'rgba(0, 0, 0, 0.5)',   // Dark overlays
  BACKGROUND_PRIMARY_ALPHA_60: 'rgba(0, 0, 0, 0.6)',   // Heavy overlays
  BACKGROUND_PRIMARY_ALPHA_70: 'rgba(0, 0, 0, 0.7)',   // Very heavy overlays
  BACKGROUND_PRIMARY_ALPHA_80: 'rgba(0, 0, 0, 0.8)',   // Maximum overlays
  
  // Gradients - Named by purpose
  GRADIENTS: {
    ACCENT_PRIMARY: 'linear-gradient(to right, #D4AF37, #B8941F)',           // Main buttons, CTAs
    ACCENT_PRIMARY_REVERSE: 'linear-gradient(to left, #D4AF37, #B8941F)',   // Special effects
    ACCENT_PRIMARY_RADIAL: 'radial-gradient(circle, #D4AF37, #B8941F)',     // Spotlight effects
    
    BACKGROUND_DARK_TO_LIGHT: 'linear-gradient(to bottom, #000000, #0A0A0A)', // Section transitions
    BACKGROUND_LIGHT_TO_DARK: 'linear-gradient(to bottom, #0A0A0A, #000000)', // Section transitions
    
    OVERLAY_IMAGE_DARK: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.8))', // Hero images
    OVERLAY_IMAGE_MEDIUM: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.6), rgba(0,0,0,0.8))', // Testimonial images
    
    OVERLAY_TEXT_LIGHT: 'linear-gradient(to top, rgba(255,255,240,0.8), rgba(255,255,240,0.4), transparent)', // Text overlays
  },
  
  // Glass Morphism Effects - Named by purpose
  GLASS: {
    CARD_BACKGROUND: 'rgba(0, 0, 0, 0.4)',      // Main card backgrounds
    CARD_HOVER: 'rgba(0, 0, 0, 0.6)',           // Hover state cards
    CARD_ACTIVE: 'rgba(0, 0, 0, 0.8)',          // Active/focused cards
    
    ACCENT_BACKGROUND: 'rgba(212, 175, 55, 0.1)', // Accent glass backgrounds
    ACCENT_HOVER: 'rgba(212, 175, 55, 0.2)',      // Accent hover states
    ACCENT_ACTIVE: 'rgba(212, 175, 55, 0.3)',     // Accent active states
  },
  
  // Shadows - Named by purpose
  SHADOWS: {
    ACCENT_SUBTLE: '0 4px 20px rgba(212, 175, 55, 0.15)',    // Subtle accent shadows
    ACCENT_MEDIUM: '0 8px 30px rgba(212, 175, 55, 0.25)',    // Medium accent shadows
    ACCENT_STRONG: '0 12px 40px rgba(212, 175, 55, 0.35)',    // Strong accent shadows
    
    BACKGROUND_SUBTLE: '0 4px 20px rgba(0, 0, 0, 0.3)',        // Subtle background shadows
    BACKGROUND_MEDIUM: '0 8px 30px rgba(0, 0, 0, 0.5)',        // Medium background shadows
    BACKGROUND_STRONG: '0 12px 40px rgba(0, 0, 0, 0.7)',        // Strong background shadows
  },
  
  // Border Colors - Named by purpose
  BORDERS: {
    ACCENT_SUBTLE: 'rgba(212, 175, 55, 0.2)',   // Subtle accent borders
    ACCENT_MEDIUM: 'rgba(212, 175, 55, 0.4)',   // Medium accent borders
    ACCENT_STRONG: 'rgba(212, 175, 55, 0.6)',   // Strong accent borders
    
    TEXT_SUBTLE: 'rgba(255, 255, 255, 0.1)',   // Subtle text borders
    TEXT_MEDIUM: 'rgba(255, 255, 255, 0.2)',   // Medium text borders
    TEXT_STRONG: 'rgba(255, 255, 255, 0.3)',   // Strong text borders
  },
  
  // Component-Specific Colors
  COMPONENTS: {
    // Button Colors
    BUTTON_PRIMARY: '#D4AF37',              // Main button background
    BUTTON_PRIMARY_TEXT: '#000000',        // Main button text
    BUTTON_SECONDARY: 'rgba(255, 255, 255, 0.1)', // Secondary button background
    BUTTON_SECONDARY_TEXT: '#FFFFFF',      // Secondary button text
    
    // Input Colors
    INPUT_BACKGROUND: 'rgba(255, 255, 255, 0.1)',  // Input field background
    INPUT_BORDER: 'rgba(255, 255, 255, 0.2)',        // Input field border
    INPUT_TEXT: '#FFFFFF',                         // Input field text
    INPUT_PLACEHOLDER: 'rgba(255, 255, 255, 0.5)',  // Input placeholder text
    
    // Card Colors
    CARD_BACKGROUND: 'rgba(0, 0, 0, 0.4)',       // Card background
    CARD_BORDER: 'rgba(212, 175, 55, 0.2)',       // Card border
    CARD_HOVER_BACKGROUND: 'rgba(0, 0, 0, 0.6)', // Card hover background
    
    // Navigation Colors
    NAV_BACKGROUND: '#000000',               // Navigation background
    NAV_TEXT: '#FFFFFF',                     // Navigation text
    NAV_TEXT_HOVER: '#D4AF37',               // Navigation hover text
    NAV_BORDER: 'rgba(212, 175, 55, 0.2)',   // Navigation borders
    
    // Status Colors
    STATUS_SUCCESS: '#10B981',               // Success states
    STATUS_WARNING: '#F59E0B',               // Warning states
    STATUS_ERROR: '#EF4444',                 // Error states
    STATUS_INFO: '#3B82F6',                   // Info states
  }
};

// Quick access constants for commonly used colors
export const {
  BACKGROUND_PRIMARY,
  BACKGROUND_SECONDARY,
  BACKGROUND_TERTIARY,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  ACCENT_PRIMARY,
  ACCENT_SECONDARY,
  ACCENT_SUBTLE,
  ACCENT_PALE,
  // All text opacity variants
  TEXT_PRIMARY_ALPHA_10,
  TEXT_PRIMARY_ALPHA_20,
  TEXT_PRIMARY_ALPHA_25,
  TEXT_PRIMARY_ALPHA_30,
  TEXT_PRIMARY_ALPHA_40,
  TEXT_PRIMARY_ALPHA_50,
  TEXT_PRIMARY_ALPHA_60,
  TEXT_PRIMARY_ALPHA_70,
  TEXT_PRIMARY_ALPHA_80,
  TEXT_PRIMARY_ALPHA_90,
  // All background opacity variants
  BACKGROUND_PRIMARY_ALPHA_10,
  BACKGROUND_PRIMARY_ALPHA_20,
  BACKGROUND_PRIMARY_ALPHA_30,
  BACKGROUND_PRIMARY_ALPHA_40,
  BACKGROUND_PRIMARY_ALPHA_50,
  BACKGROUND_PRIMARY_ALPHA_60,
  BACKGROUND_PRIMARY_ALPHA_70,
  BACKGROUND_PRIMARY_ALPHA_80,
  // All accent opacity variants
  ACCENT_PRIMARY_ALPHA_10,
  ACCENT_PRIMARY_ALPHA_20,
  ACCENT_PRIMARY_ALPHA_30,
  ACCENT_PRIMARY_ALPHA_50,
  // Complex objects
  GRADIENTS,
  GLASS,
  SHADOWS,
  BORDERS,
  COMPONENTS
} = COLORS;

// Legacy aliases for backward compatibility (deprecated)
export const LEGACY_ALIASES = {
  BLACK: BACKGROUND_PRIMARY,
  BLACK_DARK: BACKGROUND_SECONDARY,
  BLACK_LIGHT: BACKGROUND_TERTIARY,
  
  IVORY: TEXT_PRIMARY_ALPHA_70,
  IVORY_DARK: TEXT_PRIMARY_ALPHA_50,
  WHITE: TEXT_PRIMARY,
  WHITE_DARK: TEXT_SECONDARY,
  
  ROSE_GOLD: ACCENT_PRIMARY,
  ROSE_GOLD_LIGHT: ACCENT_SUBTLE,
  ROSE_GOLD_DARK: ACCENT_SECONDARY,
  ROSE_GOLD_PALE: ACCENT_PALE,
  
  ROSE_GOLD_10: ACCENT_PRIMARY_ALPHA_10,
  ROSE_GOLD_20: ACCENT_PRIMARY_ALPHA_20,
  ROSE_GOLD_30: ACCENT_PRIMARY_ALPHA_30,
  ROSE_GOLD_50: ACCENT_PRIMARY_ALPHA_50,
  
  WHITE_10: TEXT_PRIMARY_ALPHA_10,
  WHITE_20: TEXT_PRIMARY_ALPHA_20,
  WHITE_30: TEXT_PRIMARY_ALPHA_30,
  WHITE_40: TEXT_PRIMARY_ALPHA_40,
  WHITE_50: TEXT_PRIMARY_ALPHA_50,
  WHITE_60: TEXT_PRIMARY_ALPHA_60,
  WHITE_70: TEXT_PRIMARY_ALPHA_70,
  WHITE_80: TEXT_PRIMARY_ALPHA_80,
  WHITE_90: TEXT_PRIMARY_ALPHA_90,
  
  BLACK_10: BACKGROUND_PRIMARY_ALPHA_10,
  BLACK_20: BACKGROUND_PRIMARY_ALPHA_20,
  BLACK_30: BACKGROUND_PRIMARY_ALPHA_30,
  BLACK_40: BACKGROUND_PRIMARY_ALPHA_40,
  BLACK_50: BACKGROUND_PRIMARY_ALPHA_50,
  BLACK_60: BACKGROUND_PRIMARY_ALPHA_60,
  BLACK_70: BACKGROUND_PRIMARY_ALPHA_70,
  BLACK_80: BACKGROUND_PRIMARY_ALPHA_80,
};
