export const Colors = {
  primary: "#18C0C0", // Teal accent color
  primaryDark: "#0FA39D",
  success: "#4CAF50",
  error: "#F44336",
  background: "#FFFFFF",
  text: "#000000",
  textLight: "#666666",
  textGrey: "#999999",
  border: "#E0E0E0",
  lightGrey: "#F5F5F5",
  checkmark: "#4CAF50",
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: "bold" as const,
    color: Colors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: Colors.text,
  },
  body: {
    fontSize: 16,
    color: Colors.text,
  },
  subtext: {
    fontSize: 14,
    color: Colors.textLight,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 100,
};
