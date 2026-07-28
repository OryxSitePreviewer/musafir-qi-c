/**
 * Global site settings.
 * Edit this file to change the brand name, domain, contact number, or social links.
 */

export interface SocialLink {
  label: string;
  href: string;
  /** Key used to pick the inline SVG icon. See src/components/Icon.astro */
  icon: 'facebook' | 'instagram' | 'tiktok' | 'whatsapp';
}

export interface SiteConfig {
  name: string;
  shortName: string;
  chineseName: string;
  tagline: string;
  signBoard: string;
  officialListingName?: string;
  priceRange?: string;
  description: string;
  /** Production URL. Change this before you deploy or the sitemap and og:url will be wrong. */
  url: string;
  /**
   * WhatsApp number in international format with no plus sign, spaces, or dashes.
   * Example for Malaysia: 60123456789
   *
   * TODO: confirm with owner. The value below is a placeholder and every WhatsApp
   * link on the site will be broken until it is replaced.
   */
  whatsappNumber: string;
  /** Human readable phone number shown in the footer and on location cards. */
  phoneDisplay: string;
  /** TODO: confirm with owner. */
  email: string;
  socials: SocialLink[];
  /**
   * Google Analytics measurement ID, for example G-XXXXXXXXXX.
   * Leave it empty and no tracking script is emitted at all.
   */
  googleAnalyticsId: string;
}

export const SITE: SiteConfig = {
  name: 'Musafir Qi Stesen Mala',
  shortName: 'Stesen Mala',
  chineseName: '麻辣烫',
  officialListingName: 'Musafir China Muslim BBQ& Hot Pot&Malatang',
  tagline: 'Pick your ingredients. We weigh it. You pay for exactly what you took.',
  /** The three things the shopfront sign advertises, in the order it lists them. */
  signBoard: 'Hot Pot · Charcoal Skewers · Malatang',
  /** Keep this under 155 characters or Google will cut it off mid sentence. */
  description:
    'Halal Chinese Muslim malatang, hot pot & charcoal skewers in Cyberjaya. No pork, no lard, no alcohol. Fill your own bowl and pay by weight.',
  url: 'https://musafir-qi-c.vercel.app',
  priceRange: 'RM 1–20',

  whatsappNumber: '60179916692',
  phoneDisplay: '+60 17-991 6692',
  email: 'hello@musafirqi.com.my',

  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
    { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
    { label: 'TikTok', href: 'https://www.tiktok.com/', icon: 'tiktok' },
  ],

  googleAnalyticsId: '',
};

/** Builds a wa.me link with a prefilled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Button label used site wide. Keep these consistent everywhere. */
export const LABELS = {
  whatsapp: 'Order on WhatsApp',
  menu: 'See the menu',
  find: 'Find us',
  directions: 'Get directions',
  howItWorks: 'See how it works',
} as const;
