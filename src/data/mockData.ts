import { PricingTier, ProductImage, HardwareItem, UnlockMethod, Testimonial, FaqItem } from '../types';

export const BASE_PRICE = 160000;
export const ORIGINAL_PRICE = 180000;
export const SAVINGS_PER_UNIT = 20000;
export const DEFAULT_WHATSAPP = '2348039281745'; // Business WhatsApp number for Nigeria

export const PRICING_TIERS: PricingTier[] = [
  { quantity: 1, unitPrice: 160000, totalPrice: 160000, savings: 0, label: '1 PIECE' },
  { quantity: 2, unitPrice: 155000, totalPrice: 310000, savings: 10000, label: '2 PIECES' },
  { quantity: 3, unitPrice: 150000, totalPrice: 450000, savings: 30000, label: '3 PIECES', popular: true },
  { quantity: 4, unitPrice: 145000, totalPrice: 580000, savings: 60000, label: '4 PIECES' },
  { quantity: 5, unitPrice: 140000, totalPrice: 700000, savings: 100000, label: '5 PIECES (BEST DEAL)' },
];

export function getTierForQty(qty: number): PricingTier {
  const q = Math.max(1, Math.min(10, qty));
  if (q >= 5) {
    return { quantity: q, unitPrice: 140000, totalPrice: 140000 * q, savings: (160000 - 140000) * q, label: `${q} PIECES` };
  }
  const tier = PRICING_TIERS.find((t) => t.quantity === q);
  if (tier) return tier;
  return PRICING_TIERS[0];
}

export const PRODUCT_IMAGES: ProductImage[] = [
  {
    id: 'hero-01',
    src: '/assets/img/smart-lock-hero.jpg',
    alt: 'A-01 Smart Door Lock Dual Panel with Indoor HD Screen, Tuya App, and Outdoor Biometric Handle',
    label: 'Dual Panel & App',
    badge: 'Flagship System',
  },
  {
    id: 'methods',
    src: '/assets/img/smart-lock-methods.png',
    alt: 'A-01 Smart Door Lock Multiple Unlocking Methods: Face, Palm Vein, Fingerprint, PIN, NFC Card, Key, Combination, App',
    label: 'Multiple Unlock Methods',
    badge: '8 Access Modes',
  },
  {
    id: 'mortise',
    src: '/assets/img/smart-lock-mortise.png',
    alt: 'A-01 Heavy Duty Stainless Steel 24×240mm Mortise Lock Body 60/68mm Technical Specs',
    label: 'Mortise 24×240mm',
    badge: 'Solid 304 Steel',
  },
  {
    id: 'app-unlock',
    src: '/assets/img/smart-lock-app-unlock.png',
    alt: 'Smartphone App Unlock Remotely with Real-Time Video Talk to Visitor',
    label: 'Remote App & Two-Way Talk',
    badge: 'Tuya Smart Life',
  },
];

export const UNLOCK_METHODS: UnlockMethod[] = [
  {
    id: 'face',
    title: 'Face Recognition',
    description: '3D infrared facial recognition unlocks your door hands-free in under 0.5s.',
    iconName: 'ScanFace',
    badge: '3D AI Sensor',
  },
  {
    id: 'fingerprint',
    title: 'Fingerprint',
    description: 'High-precision semiconductor biometric sensor detects live pulse with 99.8% accuracy.',
    iconName: 'Fingerprint',
    badge: '< 0.3s Match',
  },
  {
    id: 'smartphone',
    title: 'Smartphone App',
    description: 'Control, lock, unlock, and check visitor history directly from iOS or Android.',
    iconName: 'Smartphone',
    badge: 'Remote Control',
  },
  {
    id: 'password',
    title: 'Password / PIN',
    description: 'Anti-peep virtual digits protection allows entering dummy numbers before or after real PIN.',
    iconName: 'KeyRound',
    badge: 'Anti-Peep PIN',
  },
  {
    id: 'otp',
    title: 'OTP / Temporary Code',
    description: 'Generate time-limited one-time passcodes for housekeepers, visitors, or Airbnb guests.',
    iconName: 'ShieldCheck',
    badge: 'Guest Friendly',
  },
  {
    id: 'mechanical',
    title: 'Mechanical Key',
    description: 'Concealed high-security C-grade brass cylinder keyhole for physical emergency backup.',
    iconName: 'Key',
    badge: '2 Keys Included',
  },
  {
    id: 'emergency-power',
    title: 'Type-C Emergency Power',
    description: 'Plug in any standard power bank to power the lock in seconds if the battery ever runs flat.',
    iconName: 'BatteryCharging',
    badge: 'Type-C Port',
  },
  {
    id: 'doorbell',
    title: 'One-Click Doorbell',
    description: 'Built-in high-volume chime rings instantly and snapshots visitors on the interior screen.',
    iconName: 'Bell',
    badge: 'Built-in Chime',
  },
];

export const HARDWARE_HIGHLIGHTS: HardwareItem[] = [
  {
    id: 'camera',
    title: 'Face Recognition / Cat Eye Camera',
    description: '1080p wide-angle infrared night-vision lens captures visitors clearly day or night.',
    iconName: 'Camera',
    spec: 'Wide Angle 160°',
  },
  {
    id: 'interior-screen',
    title: '4.0-inch Interior Screen',
    description: 'Crisp IPS digital display inside shows who is at your doorstep before you open.',
    iconName: 'Tv',
    spec: '4.0" IPS Color',
  },
  {
    id: 'touch-key',
    title: 'Touch Function Key',
    description: 'Scratch-resistant tempered capacitive touchscreen with responsive tactile feedback.',
    iconName: 'Touchpad',
    spec: 'Capacitive Glass',
  },
  {
    id: 'one-btn-lock',
    title: 'One Button Switch Lock',
    description: 'Lock your entire multi-point mortise bolts with a single tap as you leave.',
    iconName: 'Lock',
    spec: 'Instant Lock',
  },
  {
    id: 'quick-handle',
    title: 'Quick Open Handle',
    description: 'Ergonomic free-angle handle designed for quick anti-panic emergency egress.',
    iconName: 'Maximize2',
    spec: 'Quick Exit',
  },
  {
    id: 'anti-lock',
    title: 'Anti-Lock Knob',
    description: 'Internal safety thumb-turn knob locks the door from inside for total privacy at night.',
    iconName: 'ShieldAlert',
    spec: 'Double Night Lock',
  },
  {
    id: 'display-screen',
    title: 'Display Screen Prompts',
    description: 'Interactive visual status showing battery life, lock status, and user menus.',
    iconName: 'Monitor',
    spec: 'OLED Feedback',
  },
  {
    id: 'pin-area',
    title: 'Password Swipe Area',
    description: 'Backlit luminescent keypad with IC card NFC card reader integration.',
    iconName: 'Grid',
    spec: 'Card + PIN Swipe',
  },
  {
    id: 'semiconductor',
    title: 'Semiconductor Fingerprint',
    description: 'Integrated biometric reader located ergonomically on the handle grip.',
    iconName: 'Fingerprint',
    spec: 'FPC Bio Sensor',
  },
  {
    id: 'doorbell-callout',
    title: 'One-Click Doorbell',
    description: 'Dedicated chime button rings inside and sends an alert to your mobile phone.',
    iconName: 'BellRing',
    spec: 'Integrated Chime',
  },
  {
    id: 'keyhole',
    title: 'Mechanical Keyhole',
    description: 'Hidden bottom keyhole preserves the clean exterior design while providing backup access.',
    iconName: 'Key',
    spec: 'C-Grade Cylinder',
  },
  {
    id: 'emergency-c',
    title: 'Type-C Emergency Interface',
    description: 'External USB-C power port prevents ever getting locked out due to depleted batteries.',
    iconName: 'Zap',
    spec: '5V Type-C Port',
  },
  {
    id: 'app-sync',
    title: 'Smartphone Unlocking',
    description: 'Tuya Smart / Smart Life ecosystem integration for remote unlock & logs.',
    iconName: 'Wifi',
    spec: 'Tuya / Smart Life',
  },
];

export const NIGERIAN_STATES = [
  'Lagos',
  'Abuja (FCT)',
  'Rivers',
  'Ogun',
  'Oyo',
  'Anambra',
  'Edo',
  'Delta',
  'Enugu',
  'Kano',
  'Kaduna',
  'Akwa Ibom',
  'Imo',
  'Ondo',
  'Osun',
  'Abia',
  'Cross River',
  'Kwara',
  'Plateau',
  'Benue',
  'Bayelsa',
  'Ebonyi',
  'Ekiti',
  'Gombe',
  'Jigawa',
  'Kebbi',
  'Kogi',
  'Katsina',
  'Nasarawa',
  'Niger',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
  'Bauchi',
  'Borno',
  'Adamawa',
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Engr. Babatunde Adeyemi',
    location: 'Lekki Phase 1, Lagos',
    rating: 5,
    date: '3 days ago',
    review:
      'The facial recognition works like magic even in pitch darkness when I come back from work. I ordered 3 locks for my duplex in Lekki, received them the next day, and paid with my POS card upon inspection. Very sturdy lock body!',
    verified: true,
    lockInstalledOn: 'Main Security Entrance Door',
  },
  {
    id: '2',
    name: 'Dr. Chidinma Okafor',
    location: 'Maitama, Abuja',
    rating: 5,
    date: '1 week ago',
    review:
      'I run a short-let apartment in Abuja. The OTP feature alone has saved me countless trips—I just generate a temporary passcode for each guest and set the expiry date. Max Luxury Bathrooms customer service was top notch.',
    verified: true,
    lockInstalledOn: 'Serviced Short-Let Apartment',
  },
  {
    id: '3',
    name: 'Alhaji Musa Danjuma',
    location: 'GRA, Port Harcourt',
    rating: 5,
    date: '2 weeks ago',
    review:
      'Solid hardware. My carpenter installed it without any hassle using the mortise template. The 4-inch interior screen lets my family see who is outside clearly before unlocking. Truly value for money at ₦160,000.',
    verified: true,
    lockInstalledOn: 'Family Residence Front Door',
  },
  {
    id: '4',
    name: 'Barrister Folake Adeleke',
    location: 'Bodija, Ibadan',
    rating: 5,
    date: '3 weeks ago',
    review:
      'No more searching for keys inside my handbag in the rain! The fingerprint unlock is lightning fast. Payment on delivery gave me 100% peace of mind before buying. Highly recommend Max Luxury Bathrooms.',
    verified: true,
    lockInstalledOn: 'Master Suite & Penthouse',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Can I unlock the smart lock with my phone?',
    answer:
      'Yes! The A-01 Smart Door Lock connects seamlessly with the Tuya / Smart Life mobile app on iOS and Android. You can unlock remotely, generate temporary visitor passcodes, view access logs, and receive live notifications whenever someone rings the doorbell.',
  },
  {
    id: 'faq-2',
    question: 'Can I use my fingerprint to unlock?',
    answer:
      'Yes! The lock features an advanced 360° semiconductor biometric fingerprint scanner integrated ergonomically directly on the handle. It unlocks the door in less than 0.3 seconds with 99.8% precision.',
  },
  {
    id: 'faq-3',
    question: 'Does it support face recognition?',
    answer:
      'Yes! It features a 3D infrared biometric face recognition sensor at the top. It scans structural facial geometry and unlocks quickly even in total darkness, with hats, or with glasses, without being fooled by photos or videos.',
  },
  {
    id: 'faq-4',
    question: 'Can I use a password / PIN code?',
    answer:
      'Yes! You can set 6 to 10 digit PIN codes. It includes anti-peep virtual password technology: you can key in random digits before or after your actual password to prevent bystanders from memorizing your code.',
  },
  {
    id: 'faq-5',
    question: 'Can I generate a temporary access code for visitors or cleaners?',
    answer:
      'Yes! Through the companion smartphone app, you can generate time-limited OTPs (One-Time Passwords) or custom date/time range codes that automatically expire after use or after your guest checks out.',
  },
  {
    id: 'faq-6',
    question: 'Does it come with physical backup keys?',
    answer:
      'Yes! Every package comes with 2 high-security precision mechanical override keys and a hidden bottom keyhole slot so you always have guaranteed access under any circumstances.',
  },
  {
    id: 'faq-7',
    question: 'What happens during an emergency or if the battery dies?',
    answer:
      'The lock alerts you weeks in advance when the battery is low. If it ever completely depletes while you are away, simply plug any standard phone power bank into the external Type-C emergency port to power it up instantly, or use your physical mechanical key.',
  },
  {
    id: 'faq-8',
    question: 'Is Payment on Delivery (POD) available across Nigeria?',
    answer:
      'Yes! We offer Payment on Delivery (Cash or POS card transfer upon inspection) in major cities including Lagos, Abuja, Port Harcourt, Ibadan, and select regional capitals. Delivery takes 24–48 hours in Lagos/Abuja and 2–4 days nationwide.',
  },
];
