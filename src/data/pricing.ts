/**
 * Pricing.
 *
 * The whole site reads the price per 100 grams from ONE constant below.
 * When the price changes, change PRICE_PER_100G and nothing else.
 */

/**
 * Ringgit charged per 100 grams of picked ingredients, after cooking weight is
 * measured at the counter.
 *
 * TODO: confirm with owner. RM 6.90 is a placeholder based on the going rate for
 * pick-and-weigh malatang in the Klang Valley. Replace it with the real number.
 */
export const PRICE_PER_100G = 6.9;

export const CURRENCY = 'RM';

/**
 * Whether the soup base is included in the per-100g price or charged separately.
 * TODO: confirm with owner.
 */
export const SOUP_BASE_INCLUDED = true;

/**
 * Reference weights used by the Build Your Bowl estimator to tell a first timer
 * whether their bowl is small, normal, or large. These are guides, not rules.
 */
export const PORTION_GUIDE = {
  /** A light bowl for one person. */
  light: 300,
  /** What most single diners land on. The estimator marks this on the bowl. */
  typical: 450,
  /** A big appetite, or a bowl being shared. */
  large: 650,
  /** Point at which the bowl graphic is drawn as full. */
  bowlCapacity: 900,
} as const;

/** Formats a ringgit amount for display. Always two decimal places. */
export function formatPrice(amount: number): string {
  return `${CURRENCY} ${amount.toFixed(2)}`;
}

/** Converts a gram total into an estimated ringgit price. */
export function estimatePrice(grams: number): number {
  return (grams / 100) * PRICE_PER_100G;
}
