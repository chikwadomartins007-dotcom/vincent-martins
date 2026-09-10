export interface PricingTier {
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  savings: number;
  label: string;
  popular?: boolean;
}

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  label: string;
  badge?: string;
}

export interface HeroSlide {
  id: string;
  tabTitle: string;
  badge: string;
  headlinePrefix: string;
  headlineHighlight: string;
  subheadline: string;
  keyFeature: string;
  bullets: string[];
  imageIndex: number;
}

export interface AppInterfaceSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  iconName: string;
  statusBadge: string;
  imageSrc: string;
}

export interface HardwareItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  spec?: string;
}

export interface UnlockMethod {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  review: string;
  verified: boolean;
  lockInstalledOn: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface OrderFormData {
  fullName: string;
  phoneNumber: string;
  whatsappNumber: string;
  email?: string;
  deliveryAddress: string;
  city: string;
  state: string;
  quantity: number;
  paymentMethod: string;
  deliveryNotes?: string;
  agreedToTerms: boolean;
}
