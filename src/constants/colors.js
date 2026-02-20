// Ultra-Premium Color Palette - Semantic Naming System
// Colors are named by their purpose, not their appearance

export const COLORS = {
  // Background Ramp (cohesive scroll) - New System
  BACKGROUND_PRIMARY: '#F3EFE8',      // Warm Stone (main canvas)
  BACKGROUND_SECONDARY: '#EEE7DE',    // Warm Stone (slightly deeper - section alt)
  BACKGROUND_TERTIARY: '#E7DED3',     // Soft panel base (replaces full taupe)
  BACKGROUND_INSET: '#D8CFC4',        // Soft Taupe (inset blocks only)
  BACKGROUND_SUBTLE_LIGHT: 'rgba(243, 239, 232, 0.5)', // For subtle background elements like upload areas
  BACKGROUND_DIALOG: '#F3EFE8',      // Dialog/modal containers (same as primary but explicitly named)
  BACKGROUND_DEEP: '#2C2623',         // Espresso (rare: footer/testimonial/CTA)
  
  // Text Colors - Named by purpose - New Palette
  TEXT_PRIMARY: '#2C2623',            // Espresso Brown
  TEXT_SECONDARY: '#4A4541',         // Lighter Espresso
  TEXT_TERTIARY: '#6F7B6B',          // Muted Olive
  
  // Accent Colors - Named by purpose - Brilliance Gold System
  ACCENT_PRIMARY: '#C79A3A',          // Richer gold mid (more gold, less brown)
  ACCENT_SECONDARY: '#F3E3B8',        // Champagne highlight
  ACCENT_SUBTLE: '#E4C978',          // Light gold mid
  ACCENT_DEEP: '#8C651E',            // NEW: Deep edge for "metal"
  ACCENT_HIGHLIGHT: '#FFF4D6',      // NEW: Specular highlight
  ACCENT_PALE: '#D9C4A8',            // Very Light Gold
  
  // Olive Tint (for subtle spa feel) - New System
  OLIVE_TINT_10: 'rgba(111, 123, 107, 0.10)',  // Subtle olive overlay
  OLIVE_TINT_16: 'rgba(111, 123, 107, 0.16)',  // Medium olive overlay
  
  // Opacity Variants - Named by purpose - Updated for Brilliance Gold
  ACCENT_PRIMARY_ALPHA_10: 'rgba(199, 154, 58, 0.1)',   // Hover backgrounds
  ACCENT_PRIMARY_ALPHA_20: 'rgba(199, 154, 58, 0.2)',   // Active states
  ACCENT_PRIMARY_ALPHA_30: 'rgba(199, 154, 58, 0.3)',   // Emphasis areas
  ACCENT_PRIMARY_ALPHA_50: 'rgba(199, 154, 58, 0.5)',   // Overlays
  
  // Espresso Anchor Opacity Variants (for controlled dark moments)
  ESPRESSO_ALPHA_08: 'rgba(44, 38, 35, 0.08)',      // Subtle dividers/borders
  ESPRESSO_ALPHA_10: 'rgba(44, 38, 35, 0.10)',      // Light overlays
  ESPRESSO_ALPHA_12: 'rgba(44, 38, 35, 0.12)',      // Medium overlays
  ESPRESSO_ALPHA_85: 'rgba(44, 38, 35, 0.85)',      // Hero overlay (85% opacity)
  ESPRESSO_ALPHA_92: 'rgba(44, 38, 35, 0.92)',      // Solid band (92% opacity)
  
  TEXT_PRIMARY_ALPHA_10: 'rgba(44, 38, 35, 0.1)',   // Very subtle text
  TEXT_PRIMARY_ALPHA_20: 'rgba(44, 38, 35, 0.2)',   // Placeholder text
  TEXT_PRIMARY_ALPHA_25: 'rgba(44, 38, 35, 0.25)',  // Subtle text
  TEXT_PRIMARY_ALPHA_30: 'rgba(44, 38, 35, 0.3)',   // Muted text
  TEXT_PRIMARY_ALPHA_35: 'rgba(44, 38, 35, 0.35)',  // Medium-muted text
  TEXT_PRIMARY_ALPHA_40: 'rgba(44, 38, 35, 0.4)',   // Subtle dividers
  TEXT_PRIMARY_ALPHA_50: 'rgba(44, 38, 35, 0.5)',   // Secondary text
  TEXT_PRIMARY_ALPHA_60: 'rgba(44, 38, 35, 0.6)',   // Content text
  TEXT_PRIMARY_ALPHA_70: 'rgba(44, 38, 35, 0.7)',   // Important text
  TEXT_PRIMARY_ALPHA_80: 'rgba(44, 38, 35, 0.8)',   // Heading text
  TEXT_PRIMARY_ALPHA_90: 'rgba(44, 38, 35, 0.9)',   // Bright text
  
  BACKGROUND_PRIMARY_ALPHA_10: 'rgba(243, 239, 232, 0.1)',   // Very subtle overlays
  BACKGROUND_PRIMARY_ALPHA_20: 'rgba(243, 239, 232, 0.2)',   // Light overlays
  BACKGROUND_PRIMARY_ALPHA_30: 'rgba(243, 239, 232, 0.3)',   // Medium overlays
  BACKGROUND_PRIMARY_ALPHA_40: 'rgba(243, 239, 232, 0.4)',   // Card backgrounds
  BACKGROUND_PRIMARY_ALPHA_50: 'rgba(243, 239, 232, 0.5)',   // Dark overlays
  BACKGROUND_PRIMARY_ALPHA_60: 'rgba(243, 239, 232, 0.6)',   // Heavy overlays
  BACKGROUND_PRIMARY_ALPHA_70: 'rgba(243, 239, 232, 0.7)',   // Very heavy overlays
  BACKGROUND_PRIMARY_ALPHA_80: 'rgba(243, 239, 232, 0.8)',   // Maximum overlays
  
  // Gradients - Named by purpose - Brilliance Gold System
  GRADIENTS: {
    // 5-Stop Brilliance Gold (specular highlight) - Enhanced
    GOLD_BRILLIANCE: 'linear-gradient(135deg, #FFF4D6 0%, #F3E3B8 18%, #E4C978 42%, #C79A3A 70%, #8C651E 100%)',
    ACCENT_PRIMARY: 'linear-gradient(to right, #F3E3B8, #C79A3A)',           // Simple gold gradient (updated)
    ACCENT_PRIMARY_REVERSE: 'linear-gradient(to left, #F3E3B8, #C79A3A)',   // Special effects
    ACCENT_PRIMARY_RADIAL: 'radial-gradient(circle, #F3E3B8, #C79A3A)',     // Spotlight effects
    
    // Gold Reflect Effect (metallic sheen)
    GOLD_REFLECT: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 35%, rgba(255,255,255,0) 60%)',
    
    // Stone-to-Stone Transitions (cohesive)
    SECTION_FADE: 'linear-gradient(180deg, rgba(243,239,232,0) 0%, rgba(243,239,232,1) 70%)',
    SECTION_BLEND: 'linear-gradient(180deg, #F3EFE8 0%, #EEE7DE 100%)',
    
    OVERLAY_IMAGE_DARK: 'linear-gradient(to bottom, rgba(44,38,35,0.7), rgba(44,38,35,0.5), rgba(44,38,35,0.8))', // Hero images
    OVERLAY_IMAGE_MEDIUM: 'linear-gradient(to bottom, rgba(44,38,35,0.8), rgba(44,38,35,0.6), rgba(44,38,35,0.8))', // Testimonial images
    
    OVERLAY_TEXT_LIGHT: 'linear-gradient(to top, rgba(243,239,232,0.8), rgba(243,239,232,0.4), transparent)', // Text overlays
  },
  
  // Glass Morphism Effects - Named by purpose - Warm Stone Base (Darker)
  GLASS: {
    CARD_BACKGROUND: 'rgba(44, 38, 35, 0.15)',      // Main card backgrounds (darker Espresso tint)
    CARD_HOVER: 'rgba(44, 38, 35, 0.25)',           // Hover state cards
    CARD_ACTIVE: 'rgba(44, 38, 35, 0.35)',          // Active/focused cards
    
    ACCENT_BACKGROUND: 'rgba(184, 146, 58, 0.1)',     // Accent glass backgrounds (Antique Gold)
    ACCENT_HOVER: 'rgba(184, 146, 58, 0.2)',          // Accent hover states
    ACCENT_ACTIVE: 'rgba(184, 146, 58, 0.3)',         // Accent active states
    
    TEXT_OVERLAY: 'rgba(243, 239, 232, 0.05)',        // Text overlay backgrounds (Warm Stone)
    BORDER_SUBTLE: 'rgba(44, 38, 35, 0.15)',          // Subtle borders (Espresso Brown - darker)
  },
  
  // Shadow System - Named by purpose - Enhanced Gold Pop
  SHADOWS: {
    SUBTLE: '0 1px 3px rgba(44, 38, 35, 0.12)',       // Subtle shadows (Espresso Brown)
    MEDIUM: '0 4px 6px rgba(44, 38, 35, 0.15)',        // Medium shadows
    LARGE: '0 10px 15px rgba(44, 38, 35, 0.2)',        // Large shadows
    ACCENT_LIGHT: '0 4px 12px rgba(199, 154, 58, 0.15)', // Accent shadows (updated gold)
    ACCENT_MEDIUM: '0 8px 24px rgba(199, 154, 58, 0.25)', // Medium accent shadows (updated gold)
    ACCENT_STRONG: '0 16px 32px rgba(199, 154, 58, 0.35)', // Strong accent shadows (updated gold)
    
    // Enhanced Gold Pop (metallic button treatment)
    GOLD_POP: '0 10px 28px rgba(199, 154, 58, 0.28), 0 2px 8px rgba(44, 38, 35, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.55)',
    
    // Gold Button Border (subtle definition)
    GOLD_BORDER: '1px solid rgba(140, 101, 30, 0.25)',
  },
  
  // Border System - Named by purpose - New Palette
  BORDERS: {
    SUBTLE: 'rgba(44, 38, 35, 0.1)',                  // Subtle borders (Espresso Brown)
    MEDIUM: 'rgba(44, 38, 35, 0.2)',                  // Medium borders
    STRONG: 'rgba(44, 38, 35, 0.3)',                  // Strong borders
    
    ACCENT_SUBTLE: 'rgba(184, 146, 58, 0.2)',         // Subtle accent borders (Antique Gold)
    ACCENT_MEDIUM: 'rgba(184, 146, 58, 0.4)',         // Medium accent borders
    ACCENT_STRONG: 'rgba(184, 146, 58, 0.6)',         // Strong accent borders
    
    TEXT_SUBTLE: 'rgba(44, 38, 35, 0.15)',            // Subtle text borders
    TEXT_MEDIUM: 'rgba(44, 38, 35, 0.25)',            // Medium text borders
  },
  
  // Component-Specific Colors - Named by purpose - Enhanced Gold System (Darker Cards)
  COMPONENTS: {
    BUTTON_PRIMARY: '#C79A3A',                         // Primary button background (richer gold)
    BUTTON_PRIMARY_TEXT: '#2C2623',                    // Primary button text (Espresso for premium contrast)
    BUTTON_PRIMARY_HOVER: '#F3E3B8',                   // Primary button hover (champagne highlight)
    
    BUTTON_SECONDARY: 'rgba(44, 38, 35, 0.1)',        // Secondary button background (Espresso Brown)
    BUTTON_SECONDARY_TEXT: '#2C2623',                 // Secondary button text
    BUTTON_SECONDARY_HOVER: 'rgba(44, 38, 35, 0.2)',  // Secondary button hover
    
    INPUT_BACKGROUND: 'rgba(44, 38, 35, 0.08)',        // Input field background (darker Espresso)
    INPUT_BORDER: 'rgba(199, 154, 58, 0.3)',         // Input field border (updated gold)
    INPUT_TEXT: '#2C2623',                            // Input field text (Espresso Brown)
    INPUT_PLACEHOLDER: 'rgba(44, 38, 35, 0.5)',      // Input placeholder
    
    CARD_BACKGROUND: 'rgba(44, 38, 35, 0.12)',       // Card background (darker Espresso)
    CARD_BORDER: 'rgba(199, 154, 58, 0.25)',          // Card border (darker gold)
    CARD_SHADOW: '0 4px 6px rgba(44, 38, 35, 0.15)',  // Card shadow (Espresso Brown)
    
    NAV_BACKGROUND: 'rgba(243, 239, 232, 0.95)',     // Navigation background (Warm Stone)
    NAV_BORDER: 'rgba(199, 154, 58, 0.2)',            // Navigation border (updated gold)
    NAV_TEXT: '#2C2623',                              // Navigation text (Espresso Brown)
    NAV_TEXT_HOVER: '#C79A3A',                        // Navigation text hover (updated gold)
    
    FOOTER_BACKGROUND: '#F3EFE8',                     // Footer background (Warm Stone)
    FOOTER_TEXT: 'rgba(44, 38, 35, 0.7)',            // Footer text (Espresso Brown)
    FOOTER_LINK: '#C79A3A',                           // Footer link (updated gold)
    FOOTER_LINK_HOVER: '#F3E3B8',                     // Footer link hover (champagne)
    
    STATUS_SUCCESS: '#7A9A7F',                        // Success status (muted green)
    STATUS_WARNING: '#F3E3B8',                        // Warning status (champagne)
    STATUS_ERROR: '#B85D5D',                          // Error status (muted red)
    STATUS_INFO: '#7A8FB8',                           // Info status (muted blue)
  },
};

// Quick access constants for commonly used colors
export const {
  BACKGROUND_PRIMARY,
  BACKGROUND_SECONDARY,
  BACKGROUND_TERTIARY,
  BACKGROUND_INSET,
  BACKGROUND_SUBTLE_LIGHT,
  BACKGROUND_DIALOG,
  BACKGROUND_DEEP,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  ACCENT_PRIMARY,
  ACCENT_SECONDARY,
  ACCENT_SUBTLE,
  ACCENT_DEEP,
  ACCENT_HIGHLIGHT,
  ACCENT_PALE,
  // Olive tint overlays
  OLIVE_TINT_10,
  OLIVE_TINT_16,
  // Espresso anchor moments
  ESPRESSO_ALPHA_08,
  ESPRESSO_ALPHA_10,
  ESPRESSO_ALPHA_12,
  ESPRESSO_ALPHA_85,
  ESPRESSO_ALPHA_92,
  // All text opacity variants
  TEXT_PRIMARY_ALPHA_10,
  TEXT_PRIMARY_ALPHA_20,
  TEXT_PRIMARY_ALPHA_25,
  TEXT_PRIMARY_ALPHA_30,
  TEXT_PRIMARY_ALPHA_35,
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
  COMPONENTS,
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
