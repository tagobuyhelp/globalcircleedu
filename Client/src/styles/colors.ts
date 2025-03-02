export const brandColors = {
  primary: {
    DEFAULT: '#004e9a',
    light: '#60a5fa',
    dark: '#003d7a',
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#004e9a',
    600: '#003d7a',
    700: '#002c5a',
    800: '#001b3a',
    900: '#000a1a'
  },
  secondary: {
    DEFAULT: '#f37021',
    light: '#faa61a',
    dark: '#d85a0f',
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f37021',
    600: '#d85a0f',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12'
  },
  accent: {
    yellow: '#faa61a',
    orange: '#f37021',
    red: '#e11b22'
  },
  gradient: {
    primary: 'linear-gradient(to right, #004e9a, #f37021)',
    secondary: 'linear-gradient(to right, #f37021, #faa61a)',
    full: 'linear-gradient(to right, #004e9a, #f37021, #faa61a)'
  }
} as const;

export const semanticColors = {
  success: {
    light: '#22c55e',
    DEFAULT: '#16a34a',
    dark: '#15803d'
  },
  warning: {
    light: '#facc15',
    DEFAULT: '#eab308',
    dark: '#ca8a04'
  },
  error: {
    light: '#ef4444',
    DEFAULT: '#dc2626',
    dark: '#b91c1c'
  },
  info: {
    light: '#3b82f6',
    DEFAULT: '#2563eb',
    dark: '#1d4ed8'
  }
} as const;

export const themeColors = {
  light: {
    background: '#ffffff',
    surface: '#f8fafc',
    border: '#e2e8f0',
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      disabled: '#94a3b8'
    }
  },
  dark: {
    background: '#0f172a',
    surface: '#1e293b',
    border: '#334155',
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      disabled: '#64748b'
    }
  }
} as const;

export const utilityColors = {
  overlay: {
    light: 'rgba(255, 255, 255, 0.9)',
    dark: 'rgba(15, 23, 42, 0.9)'
  },
  backdrop: {
    light: 'rgba(15, 23, 42, 0.5)',
    dark: 'rgba(15, 23, 42, 0.8)'
  },
  shadow: {
    light: 'rgba(15, 23, 42, 0.1)',
    dark: 'rgba(0, 0, 0, 0.3)'
  }
} as const;