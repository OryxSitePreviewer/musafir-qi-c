/**
 * Primary navigation. Five items plus one call to action button.
 * Adding a sixth item will break the desktop layout at 1024px, so keep it to five.
 */

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Menu and Ingredients', href: '/menu' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Locations', href: '/locations' },
  { label: 'About', href: '/about' },
];
