/**
 * The ingredient bar.
 *
 * Every ingredient carries an average cooked weight in grams. The Build Your Bowl
 * estimator adds these up and multiplies by PRICE_PER_100G from pricing.ts.
 *
 * To add an ingredient, add one line to the right category. To remove one, delete
 * the line. Nothing else needs to change.
 *
 * TODO: confirm with owner. The gram weights below are careful estimates taken from
 * standard portion sizes. Weigh a sample of each item and correct the numbers so the
 * estimator matches the counter scale.
 */

export type CategoryId = 'meat' | 'vegetables' | 'noodles' | 'tofu' | 'seafood';

/** Maps to the CSS custom properties declared in src/styles/global.css. */
export type CategoryColor = 'red' | 'green' | 'gold' | 'ink' | 'blue';

export interface Ingredient {
  name: string;
  /** Average weight of one piece or one tong-full, in grams. */
  grams: number;
  /** Optional short note shown on the menu page only. */
  note?: string;
}

export interface IngredientCategory {
  id: CategoryId;
  /** Tab label. Kept short so the tab strip fits a 320px screen. */
  label: string;
  /** Full heading used on the menu page. */
  heading: string;
  color: CategoryColor;
  /** One line describing what is on this part of the bar. */
  blurb: string;
  items: Ingredient[];
}

export const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  {
    id: 'meat',
    label: 'Meatballs',
    heading: 'Meatballs and Sliced Meat',
    color: 'red',
    blurb: 'Halal beef, lamb, and chicken. No pork anywhere on this bar.',
    items: [
      { name: 'Beef Meatball', grams: 18 },
      { name: 'Chicken Meatball', grams: 16 },
      { name: 'Cheese Beef Ball', grams: 20, note: 'Melts once it hits the soup' },
      { name: 'Mushroom Chicken Ball', grams: 18 },
      { name: 'Beef Tendon Ball', grams: 20 },
      { name: 'Spicy Chicken Ball', grams: 18 },
      { name: 'Sliced Beef Roll', grams: 25, note: 'Cooks in under a minute' },
      { name: 'Sliced Lamb Roll', grams: 25 },
      { name: 'Chicken Slice', grams: 22 },
      { name: 'Chicken Sausage', grams: 30 },
      { name: 'Beef Sausage', grams: 32 },
      { name: 'Chicken Frankfurter', grams: 28 },
      { name: 'Beef Tripe', grams: 20 },
      { name: 'Chicken Gizzard', grams: 18 },
      { name: 'Quail Egg', grams: 10 },
      { name: 'Boiled Egg', grams: 55 },
    ],
  },
  {
    id: 'vegetables',
    label: 'Vegetables',
    heading: 'Vegetables and Mushrooms',
    color: 'green',
    blurb: 'Restocked through the day. The leafy greens go in last so they stay crisp.',
    items: [
      { name: 'Baby Bok Choy', grams: 45 },
      { name: 'Choy Sum', grams: 40 },
      { name: 'Napa Cabbage', grams: 35 },
      { name: 'Chinese Spinach', grams: 35 },
      { name: 'Kangkung', grams: 30 },
      { name: 'Lettuce', grams: 30 },
      { name: 'Broccoli', grams: 40 },
      { name: 'Cauliflower', grams: 40 },
      { name: 'Corn on the Cob', grams: 60, note: 'Sweetens the soup as it cooks' },
      { name: 'Sweet Corn Kernels', grams: 40 },
      { name: 'Enoki Mushroom', grams: 45 },
      { name: 'Shiitake Mushroom', grams: 20 },
      { name: 'Button Mushroom', grams: 15 },
      { name: 'King Oyster Mushroom', grams: 35 },
      { name: 'Wood Ear Fungus', grams: 15, note: 'Stays crunchy' },
      { name: 'Lotus Root', grams: 35 },
      { name: 'Winter Melon', grams: 50 },
      { name: 'Potato Slice', grams: 30 },
      { name: 'Pumpkin Slice', grams: 40 },
      { name: 'Cherry Tomato', grams: 15 },
      { name: 'Long Bean', grams: 25 },
      { name: 'Okra', grams: 12 },
    ],
  },
  {
    id: 'noodles',
    label: 'Noodles',
    heading: 'Noodles and Carbs',
    color: 'gold',
    blurb: 'Pick one. Two kinds of noodles in one bowl gets heavy fast.',
    items: [
      { name: 'Instant Ramen', grams: 80 },
      { name: 'Hand Pulled Noodle', grams: 90 },
      { name: 'Udon', grams: 100, note: 'The heaviest option on the bar' },
      { name: 'Egg Noodle', grams: 80 },
      { name: 'Wide Rice Noodle', grams: 85 },
      { name: 'Kuey Teow', grams: 85 },
      { name: 'Bihun', grams: 60 },
      { name: 'Glass Noodle', grams: 60, note: 'Soaks up the mala' },
      { name: 'Sweet Potato Noodle', grams: 70 },
      { name: 'Konjac Noodle', grams: 70, note: 'Light, low calorie' },
      { name: 'Rice Cake Slice', grams: 45 },
      { name: 'Dumpling', grams: 25 },
      { name: 'White Rice', grams: 120, note: 'Served on the side, not in the bowl' },
    ],
  },
  {
    id: 'tofu',
    label: 'Tofu',
    heading: 'Tofu and Soy',
    color: 'ink',
    blurb: 'The pieces that hold the most soup. Tofu puffs are the ones to take.',
    items: [
      { name: 'Firm Tofu', grams: 40 },
      { name: 'Silken Tofu', grams: 45 },
      { name: 'Egg Tofu', grams: 35 },
      { name: 'Tofu Puff', grams: 8, note: 'Light, and it drinks the broth' },
      { name: 'Fried Tofu Stick', grams: 10 },
      { name: 'Fresh Bean Curd Skin', grams: 20 },
      { name: 'Fried Bean Curd Skin', grams: 12 },
      { name: 'Tofu Skin Knot', grams: 10 },
      { name: 'Soy Sheet Roll', grams: 15 },
    ],
  },
  {
    id: 'seafood',
    label: 'Seafood',
    heading: 'Seafood',
    color: 'blue',
    blurb: 'Fish, prawn, and squid. Handled and stored apart from the meat trays.',
    items: [
      { name: 'Fish Tofu', grams: 20 },
      { name: 'Fish Ball', grams: 18 },
      { name: 'Cuttlefish Ball', grams: 18 },
      { name: 'Lobster Ball', grams: 20 },
      { name: 'Fish Cake Slice', grams: 20 },
      { name: 'Fish Dumpling', grams: 22 },
      { name: 'Fish Skin Roll', grams: 12 },
      { name: 'Crab Stick', grams: 15 },
      { name: 'Prawn', grams: 20 },
      { name: 'Squid Ring', grams: 18 },
      { name: 'Squid Ball', grams: 18 },
      { name: 'Scallop', grams: 15 },
      { name: 'Seaweed Knot', grams: 10 },
    ],
  },
];

/** The real number of ingredients listed above. Printed on the menu page. */
export const INGREDIENT_COUNT = INGREDIENT_CATEGORIES.reduce(
  (total, category) => total + category.items.length,
  0
);

/**
 * The number used in headline copy, as in "over 60 fresh ingredients".
 *
 * This is deliberately a separate constant from INGREDIENT_COUNT. The marketing
 * claim should be a round number the shop is comfortable defending on a slow day
 * when a tray is empty, not a live count that drops below the claim the moment an
 * ingredient is delisted.
 *
 * Keep it at or below INGREDIENT_COUNT. The build fails loudly if it is not.
 */
export const INGREDIENT_CLAIM = 60;

if (INGREDIENT_CLAIM > INGREDIENT_COUNT) {
  throw new Error(
    `INGREDIENT_CLAIM is ${INGREDIENT_CLAIM} but only ${INGREDIENT_COUNT} ingredients are listed. ` +
      'Lower the claim or add ingredients. Do not ship a count the bar cannot back up.'
  );
}
