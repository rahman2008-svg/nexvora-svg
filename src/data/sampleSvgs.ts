export interface SampleSvg {
  id: string;
  name: string;
  category: 'Branding' | 'Tech & Cloud' | 'UI Icons' | 'Illustrations' | 'Shapes';
  description: string;
  code: string;
}

export const SAMPLE_SVGS: SampleSvg[] = [
  {
    id: 'nexvora-logo',
    name: 'NexVora Brand Emblem',
    category: 'Branding',
    description: 'Dynamic gradient geometric logo for NexVora Lab',
    code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="none">
  <defs>
    <linearGradient id="nvGradient1" x1="20" y1="20" x2="220" y2="220" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#8b5cf6" />
    </linearGradient>
    <linearGradient id="nvGradient2" x1="200" y1="40" x2="40" y2="200" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  
  <!-- Outer Glow Ring -->
  <circle cx="120" cy="120" r="95" stroke="url(#nvGradient1)" stroke-width="3" stroke-dasharray="12 8" opacity="0.4" />
  
  <!-- Central Emblem Geometry -->
  <polygon points="120,35 195,78 195,162 120,205 45,162 45,78" fill="none" stroke="url(#nvGradient1)" stroke-width="5" stroke-linejoin="round" />
  
  <!-- Inner Dynamic V Shape -->
  <path d="M75,85 L120,165 L165,85" stroke="url(#nvGradient2)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)" />
  
  <!-- Center Core Star / Spark -->
  <circle cx="120" cy="115" r="7" fill="#ffffff" />
  <circle cx="120" cy="115" r="14" fill="#38bdf8" opacity="0.35" />
</svg>`,
  },
  {
    id: 'rocket-launch',
    name: 'Rocket Launch',
    category: 'Illustrations',
    description: 'Detailed colorful spaceship rocket launching with flame exhaust',
    code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <defs>
    <linearGradient id="rocketBody" x1="70" y1="20" x2="130" y2="150" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#94a3b8" />
    </linearGradient>
    <linearGradient id="fireGrad" x1="100" y1="130" x2="100" y2="190" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="50%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#ef4444" />
    </linearGradient>
  </defs>
  <!-- Flame Exhaust -->
  <path d="M85 135 C85 170, 95 188, 100 195 C105 188, 115 170, 115 135 Z" fill="url(#fireGrad)" />
  <path d="M92 135 C92 160, 97 172, 100 178 C103 172, 108 160, 108 135 Z" fill="#ffffff" />
  
  <!-- Left & Right Fins -->
  <path d="M72 105 L50 135 L75 130 Z" fill="#ef4444" />
  <path d="M128 105 L150 135 L125 130 Z" fill="#ef4444" />
  
  <!-- Main Fuselage -->
  <path d="M100 20 C80 50, 75 90, 75 130 L125 130 C125 90, 120 50, 100 20 Z" fill="url(#rocketBody)" stroke="#475569" stroke-width="2" />
  
  <!-- Cockpit Window -->
  <circle cx="100" cy="70" r="14" fill="#0284c7" stroke="#ffffff" stroke-width="3" />
  <circle cx="97" cy="67" r="4" fill="#ffffff" />
  
  <!-- Decorative stripe -->
  <path d="M76 110 L124 110 L125 120 L75 120 Z" fill="#ef4444" />
</svg>`,
  },
  {
    id: 'cyber-shield',
    name: 'Cyber Security Shield',
    category: 'Tech & Cloud',
    description: 'Security padlock vector with glowing protective forcefield',
    code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <path d="M50 8 L18 22 V48 C18 68 32 86 50 92 C68 86 82 68 82 48 V22 L50 8 Z" fill="#0f172a" stroke="#06b6d4" stroke-width="4" stroke-linejoin="round"/>
  <rect x="36" y="46" width="28" height="24" rx="4" fill="#06b6d4"/>
  <path d="M42 46 V37 C42 32.5 45.5 29 50 29 C54.5 29 58 32.5 58 37 V46" stroke="#06b6d4" stroke-width="4" stroke-linecap="round"/>
  <circle cx="50" cy="56" r="3" fill="#0f172a"/>
  <path d="M50 59 V64" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>
</svg>`,
  },
  {
    id: 'cloud-code',
    name: 'Cloud Developer Terminal',
    category: 'Tech & Cloud',
    description: 'Cloud network with embedded code brackets and sync nodes',
    code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 46 H14 A10 10 0 0 1 14 26 A12 12 0 0 1 35 17 A14 14 0 0 1 52 30 A10 10 0 0 1 48 46 H44" />
  <polyline points="26 34 20 40 26 46" stroke="#10b981" />
  <polyline points="38 34 44 40 38 46" stroke="#10b981" />
  <line x1="33" y1="33" x2="31" y2="47" stroke="#8b5cf6" />
</svg>`,
  },
  {
    id: 'shopping-cart',
    name: 'Modern Cart Icon',
    category: 'UI Icons',
    description: 'Clean e-commerce shopping bag with price tag',
    code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
  <rect x="8" y="14" width="32" height="28" rx="6" fill="#6366f1" />
  <path d="M16 18 V12 C16 7.58 19.58 4 24 4 C28.42 4 32 7.58 32 12 V18" stroke="#a5b4fc" stroke-width="4" stroke-linecap="round" />
  <circle cx="24" cy="26" r="4" fill="#ffffff" />
</svg>`,
  },
  {
    id: 'abstract-cube',
    name: 'Isometric 3D Cube',
    category: 'Shapes',
    description: 'Isometric polyhedron with multi-tone light reflection',
    code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <!-- Top Face -->
  <polygon points="60,15 105,40 60,65 15,40" fill="#60a5fa" />
  <!-- Left Face -->
  <polygon points="15,40 60,65 60,105 15,80" fill="#2563eb" />
  <!-- Right Face -->
  <polygon points="60,65 105,40 105,80 60,105" fill="#1d4ed8" />
  <!-- Accent Lines -->
  <polyline points="15,40 60,65 105,40" stroke="#93c5fd" stroke-width="2" />
  <line x1="60" y1="65" x2="60" y2="105" stroke="#93c5fd" stroke-width="2" />
</svg>`,
  },
];
