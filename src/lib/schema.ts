/**
 * JSON-LD builders. Structured data is generated from the same data files that
 * render the page, so the two can never drift apart.
 */

import { SITE } from '../data/site';
import { LOCATIONS, type Location } from '../data/locations';
import { FAQS } from '../data/faq';
import { PRICE_PER_100G } from '../data/pricing';

/**
 * priceRange is a coarse signal for Google, not a real price.
 * A typical 450g bowl at the current rate sits in the low RM 30s.
 */
function priceRange(): string {
  const typicalBowl = (450 / 100) * PRICE_PER_100G;
  return typicalBowl < 40 ? 'RM 20 to RM 40' : 'RM 30 to RM 60';
}

export function restaurantSchema(location: Location): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE.url}/locations#${location.id}`,
    name: location.fullName,
    alternateName: [SITE.shortName, SITE.name],
    url: `${SITE.url}/locations#${location.id}`,
    image: new URL(location.image, SITE.url).href,
    telephone: location.phoneDisplay,
    servesCuisine: ['Chinese', 'Halal', 'Malatang', 'Sichuan'],
    priceRange: priceRange(),
    currenciesAccepted: 'MYR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, DuitNow QR, E-Wallet',
    acceptsReservations: 'False',
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.streetAddress,
      addressLocality: location.locality,
      addressRegion: location.region,
      postalCode: location.postalCode,
      addressCountry: location.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.geo.lat,
      longitude: location.geo.lng,
    },
    openingHoursSpecification: location.hours.map((rule) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: rule.days.map((day) => `https://schema.org/${day}`),
      opens: rule.opens,
      closes: rule.closes,
    })),
    hasMenu: `${SITE.url}/menu`,
    sameAs: SITE.socials.map((social) => social.href),
  };
}

export function allRestaurantsSchema(): Record<string, unknown>[] {
  return LOCATIONS.map(restaurantSchema);
}

export function faqSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function organisationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: new URL('/images/logo.svg', SITE.url).href,
    description: SITE.description,
    sameAs: SITE.socials.map((social) => social.href),
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: 'en-MY',
    publisher: { '@id': `${SITE.url}/#organization` },
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.path, SITE.url).href,
    })),
  };
}
