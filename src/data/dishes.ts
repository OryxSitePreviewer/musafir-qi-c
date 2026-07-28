/**
 * Soup bases, signature dishes, and add-ons.
 *
 * Spice levels run 0 to 4. Level 0 has no chilli at all.
 */

export interface SoupBase {
  id: string;
  name: string;
  chineseName?: string;
  /**
   * 'soup' means the bowl is cooked in a broth. 'dry' means it goes into the wok
   * instead. Counts printed on the site are derived from this, so the copy cannot
   * drift out of step with the menu.
   */
  type: 'soup' | 'dry';
  /** 0 to 4. */
  spice: number;
  /** What it tastes like. One or two short sentences. */
  taste: string;
  /** Shown as a badge on the menu page. */
  badge?: string;
  image: string;
  imageAlt: string;
  /** Signature bases get a card on the home page. */
  signature: boolean;
}

export interface SpiceLevel {
  level: number;
  name: string;
  chineseName: string;
  /** Plain description of what the customer is in for. */
  meaning: string;
}

export const SPICE_LEVELS: SpiceLevel[] = [
  {
    level: 0,
    name: 'No Chilli',
    chineseName: '不辣',
    meaning: 'No chilli oil and no peppercorn. Safe for children and for anyone who wants the soup without heat.',
  },
  {
    level: 1,
    name: 'Mild',
    chineseName: '微辣',
    meaning: 'You taste the numbing peppercorn more than the burn. Most first timers start here.',
  },
  {
    level: 2,
    name: 'Medium',
    chineseName: '小辣',
    meaning: 'A steady warmth that builds over the bowl. This is the level most regulars order.',
  },
  {
    level: 3,
    name: 'Spicy',
    chineseName: '中辣',
    meaning: 'Real heat, and your lips will tingle. Order a drink with it.',
  },
  {
    level: 4,
    name: 'Extra Spicy',
    chineseName: '大辣',
    meaning: 'Order this only if you already know you like mala. There is no way to turn it down once it is cooked.',
  },
];

export const SOUP_BASES: SoupBase[] = [
  {
    id: 'mala',
    type: 'soup',
    name: 'Thick and Spicy Mala Soup',
    chineseName: '麻辣汤底',
    spice: 3,
    taste:
      'Beef bone stock loaded with Sichuan peppercorn, dried chilli, and star anise. It numbs before it burns, and it clings to everything you put in it. Pick your own heat from no chilli up to extra spicy.',
    badge: 'Most ordered',
    image: '/images/soup-mala.webp',
    imageAlt: 'Three bowls of mala soup with noodles, fishballs, and vegetables in an orange red broth, with small dishes of chilli sauce beside them',
    signature: true,
  },
  {
    id: 'collagen',
    type: 'soup',
    name: 'Creamy Collagen Soup',
    chineseName: '胶原汤底',
    spice: 0,
    taste:
      'Chicken and bone broth simmered until it turns thick and milky white. Rich, a little sweet, and no chilli at all. This is the one to bring your parents to.',
    image: '/images/soup-collagen.webp',
    imageAlt: 'A bowl of milky white collagen soup with sliced meat and vegetables',
    signature: true,
  },
  {
    id: 'mala-noodles',
    type: 'dry',
    name: 'Mala Stir-Fried Noodles',
    chineseName: '麻辣炒面',
    spice: 3,
    taste:
      'Same ingredients, no soup. Everything goes into the wok with mala paste until the sauce coats the noodles and the edges catch. Dry, smoky, and heavier than it looks.',
    badge: 'Dry, no soup',
    image: '/images/dish-mala-noodles.webp',
    imageAlt: 'A plate of dark red mala stir-fried noodles with sliced meat and vegetables',
    signature: true,
  },
  {
    id: 'tomato',
    type: 'soup',
    name: 'Tomato Soup',
    chineseName: '番茄汤底',
    // TODO: confirm with owner that this base is on the menu.
    spice: 0,
    taste: 'Sweet and sour, built on stewed tomato. The one children finish fastest.',
    image: '/images/soup-tomato.webp',
    imageAlt: 'A bowl of bright red tomato soup with vegetables and noodles',
    signature: false,
  },
  {
    id: 'clear',
    type: 'soup',
    name: 'Clear Chicken Broth',
    chineseName: '清汤底',
    // TODO: confirm with owner that this base is on the menu.
    spice: 0,
    taste: 'Light chicken stock with garlic and white pepper. It lets the ingredients taste like themselves.',
    image: '/images/soup-clear.webp',
    imageAlt: 'A bowl of clear golden chicken broth with vegetables and tofu',
    signature: false,
  },
];

export const SIGNATURE_DISHES = SOUP_BASES.filter((base) => base.signature);

/** Bases cooked as a soup. Used for the counts printed on the menu page. */
export const SOUP_ONLY_BASES = SOUP_BASES.filter((base) => base.type === 'soup');

/** Bases cooked dry in the wok. */
export const DRY_BASES = SOUP_BASES.filter((base) => base.type === 'dry');

export interface AddOn {
  name: string;
  /** Ringgit. Set to null when the item is included at no extra charge. */
  price: number | null;
  note?: string;
}

export interface AddOnGroup {
  heading: string;
  /** Shown under the heading. */
  blurb: string;
  items: AddOn[];
}

/**
 * TODO: confirm with owner. Every price in this block is a placeholder set at a
 * plausible Klang Valley rate. Do not print the menu until these are checked.
 */
export const ADD_ON_GROUPS: AddOnGroup[] = [
  {
    heading: 'Soup Bases',
    blurb: 'One base comes with every bowl. Ask for a second base and it is charged separately.',
    items: [
      { name: 'Thick and Spicy Mala Soup', price: null, note: 'Included' },
      { name: 'Creamy Collagen Soup', price: null, note: 'Included' },
      { name: 'Tomato Soup', price: null, note: 'Included' },
      { name: 'Clear Chicken Broth', price: null, note: 'Included' },
      { name: 'Extra soup base, second bowl', price: 3.0 },
    ],
  },
  {
    heading: 'Sides',
    blurb: 'Cooked to order at the counter.',
    items: [
      { name: 'Fried Dumplings, six pieces', price: 8.9 },
      { name: 'Spring Rolls, four pieces', price: 6.9 },
      { name: 'Crispy Fried Chicken, three pieces', price: 9.9 },
      { name: 'Steamed White Rice', price: 2.5 },
      { name: 'Century Egg with Tofu', price: 7.9 },
    ],
  },
  {
    heading: 'Drinks',
    blurb: 'Take something sweet if you are ordering level three or four.',
    items: [
      { name: 'Chinese Tea, refillable pot', price: 3.0 },
      { name: 'Iced Soya Milk', price: 4.5 },
      { name: 'Herbal Tea', price: 4.5 },
      { name: 'Iced Lemon Tea', price: 5.0 },
      { name: 'Canned Soft Drink', price: 3.5 },
      { name: 'Bottled Mineral Water', price: 2.5 },
    ],
  },
];
