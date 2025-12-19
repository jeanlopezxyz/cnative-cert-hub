/**
 * Application Configuration
 * Centralized configuration for all app settings
 */

// External URLs
export const EXTERNAL_URLS = {
  github: 'https://github.com/jeanlopezxyz/cnative-cert-hub',
  githubCNCF: 'https://github.com/cncf/curriculum',
  githubRepo: 'jeanlopezxyz/cnative-cert-hub',
  kubernetes: {
    docs: 'https://kubernetes.io/docs/',
    slack: 'https://slack.k8s.io/',
    discussion: 'https://discuss.kubernetes.io/',
    reddit: 'https://www.reddit.com/r/kubernetes/',
  },
  learning: {
    killerSh: 'https://killer.sh',
    kodekloud: 'https://kodekloud.com',
    killercoda: 'https://killercoda.com',
    acloudGuru: 'https://learn.acloud.guru',
  },
  discounts: {
    linuxFoundationCoupons: 'https://github.com/techiescamp/linux-foundation-coupon',
  },
  cncf: {
    certifications: 'https://www.cncf.io/certification/',
    main: 'https://www.cncf.io/',
  },
  fonts: {
    googleapis: 'https://fonts.googleapis.com',
    gstatic: 'https://fonts.gstatic.com',
    // Optimized: Using variable fonts with font-display swap for better performance
    // Variable fonts reduce HTTP requests and provide smoother weight transitions
    googleFontsCss:
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Space+Grotesk:wght@300..700&display=swap',
  },
} as const;

// Color Schemes
export const COLORS = {
  // Background colors
  backgrounds: {
    dark: {
      primary: 'bg-slate-900',
      secondary: 'bg-slate-800',
      tertiary: 'bg-slate-700',
      card: 'bg-slate-900',
      hover: 'bg-slate-800/30',
      transparent: 'bg-slate-800/20',
    },
    gradients: {
      main: 'bg-gradient-to-b from-slate-900 via-slate-925 to-slate-950',
      hero: 'bg-gradient-to-br from-slate-900 via-gray-950 to-blue-950/30',
      section: 'bg-gradient-to-b from-slate-950 to-gray-950',
      button: 'bg-gradient-to-r from-blue-600 to-sky-500',
      text: 'bg-gradient-to-r from-blue-400 to-sky-300',
    },
  },
  // Border colors
  borders: {
    default: 'border-slate-800',
    subtle: 'border-slate-700',
    hover: 'border-blue-800/50',
    transparent: 'border-blue-900/20',
  },
  // Text colors
  text: {
    primary: 'text-gray-100',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
    dimmed: 'text-gray-500',
    link: 'text-blue-400',
    hover: 'text-white',
  },
  // Badge colors by level
  certificationLevels: {
    entry: 'bg-green-900/50 text-green-300 border border-green-800/50',
    intermediate: 'bg-blue-900/50 text-blue-300 border border-blue-800/50',
    advanced: 'bg-purple-900/50 text-purple-300 border border-purple-800/50',
  },
  // Achievement colors
  achievements: {
    kubestronaut: 'bg-blue-900/50 text-blue-300 border border-blue-800/50',
    golden: 'bg-amber-900/50 text-amber-300 border border-amber-800/50',
  },
} as const;

// Layout dimensions
export const DIMENSIONS = {
  sidebar: {
    width: 'w-64', // 256px
    height: 'h-[calc(100vh-5rem)]',
    mobileTop: 'top-20',
    desktopTop: 'top-20',
  },
  header: {
    height: 'h-20',
  },
  card: {
    height: 'h-[420px]',
    minHeight: {
      mobile: 'min-h-[160px]',
      tablet: 'sm:min-h-[180px]',
      desktop: 'lg:min-h-[200px]',
      large: 'xl:min-h-[220px]',
    },
    padding: {
      mobile: 'p-2',
      tablet: 'sm:p-3',
      desktop: 'lg:p-4',
    },
  },
  maxWidth: {
    container: 'max-w-7xl',
    content: 'max-w-3xl',
    narrow: 'max-w-2xl',
    search: 'max-w-md',
  },
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    wide: 1280,
  },
} as const;

// Animation timings (in ms)
export const ANIMATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 600,
  cardStagger: 100,
  fadeInUp: 600,
  scaleIn: 300,
  slideIn: 500,
  spring: {
    type: 'spring',
    stiffness: 80,
  },
} as const;

// Spacing
export const SPACING = {
  page: {
    paddingY: 'py-20',
    paddingX: 'px-4',
  },
  section: {
    marginBottom: 'mb-12',
    gap: 'gap-6',
  },
  card: {
    padding: 'p-6',
  },
} as const;

/**
 * Typography Configuration
 *
 * Semantic typography utilities for the application.
 * Font definitions and design tokens are centralized in design-tokens.css
 * to follow the Single Source of Truth principle.
 *
 * @see src/styles/design-tokens.css - Font definitions and fluid typography
 * @see tailwind.config.mjs - Tailwind font configuration
 */
export const TYPOGRAPHY = {
  // Font weights - Tailwind utility classes
  weights: {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  },

  // Semantic component sizes - combines size + font family
  sizes: {
    // Hero & Page-level typography
    hero: 'text-fluid-6xl font-display',
    title: 'text-fluid-5xl font-display',
    subtitle: 'text-fluid-2xl font-display',
    heading: 'text-fluid-3xl font-display',
    subheading: 'text-fluid-xl',

    // Body text
    body: 'text-fluid-base',
    bodySmall: 'text-fluid-sm',
    caption: 'text-fluid-xs',

    // Component-specific
    cardTitle: 'text-fluid-3xl font-display',
    cardSubtitle: 'text-fluid-base',
    badge: 'text-xs md:text-sm',
    button: 'text-fluid-sm',
    nav: 'text-sm',
    footerTitle: 'text-fluid-xl font-display',
    footerText: 'text-fluid-sm',
  },

  // Line heights - Tailwind utility classes
  lineHeights: {
    none: 'leading-none',
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  },

  // Letter spacing - Tailwind utility classes
  tracking: {
    tighter: 'tracking-tighter',
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider',
    widest: 'tracking-widest',
  },
} as const;

// Shadows
export const SHADOWS = {
  card: 'shadow-lg shadow-blue-600/30',
  button: 'shadow-md shadow-blue-600/20',
  sidebar: 'shadow-2xl shadow-black/50',
} as const;
