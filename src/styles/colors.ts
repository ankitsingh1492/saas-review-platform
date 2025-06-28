export const colors = {
  // Dashboard Background Colors
  bg: {
    primary: "#1A1C20",
    secondary: "#211E26",
    tertiary: "#222428",
  },

  // Card Colors
  card: {
    primary: "#2B2D31",
    secondary: "#332E3A",
  },

  // Text Colors
  text: {
    primary: "#E0E0E0",
    secondary: "#9E9E9E",
    muted: "#6D6875",
  },

  // Primary Accent Colors
  accent: {
    primary: "#7D5CE8",
    secondary: "#8A6FE8",
    hover: "#8A6FE8",
  },

  // Border Colors
  border: {
    primary: "#2B2D31",
    secondary: "#332E3A",
  },

  // Status Colors
  status: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },

  // Overlay Colors
  overlay: {
    primary: "rgba(0, 0, 0, 0.5)",
    backdrop: "rgba(0, 0, 0, 0.3)",
  },

  // Shadow Colors
  shadow: {
    primary: "rgba(125, 92, 232, 0.25)",
    secondary: "rgba(0, 0, 0, 0.1)",
  },
} as const;

// Type definitions for better TypeScript support
export type ColorScheme = typeof colors;
export type BackgroundColor = keyof typeof colors.bg;
export type TextColor = keyof typeof colors.text;
export type AccentColor = keyof typeof colors.accent;
export type StatusColor = keyof typeof colors.status;

// Utility functions for color manipulation
export const getColor = (
  category: keyof ColorScheme,
  variant: string
): string => {
  return (
    colors[category][variant as keyof (typeof colors)[typeof category]] || ""
  );
};

export const getBackgroundColor = (variant: BackgroundColor): string => {
  return colors.bg[variant];
};

export const getTextColor = (variant: TextColor): string => {
  return colors.text[variant];
};

export const getAccentColor = (variant: AccentColor): string => {
  return colors.accent[variant];
};

export const getStatusColor = (variant: StatusColor): string => {
  return colors.status[variant];
};

// CSS custom property helpers
export const cssVar = {
  bg: (variant: BackgroundColor) => `var(--bg-${variant})`,
  card: (variant: keyof typeof colors.card) => `var(--card-${variant})`,
  text: (variant: TextColor) => `var(--text-${variant})`,
  accent: (variant: AccentColor) => `var(--accent-${variant})`,
  border: (variant: keyof typeof colors.border) => `var(--border-${variant})`,
  status: (variant: StatusColor) => `var(--${variant})`,
  shadow: (variant: keyof typeof colors.shadow) => `var(--shadow-${variant})`,
} as const;
