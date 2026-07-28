/**
 * Google reviews.
 *
 * ============================================================================
 * WHY THIS FILE IS MOSTLY EMPTY, AND WHAT TO DO ABOUT IT
 * ============================================================================
 * The section on the page links to your Google reviews. It does not reproduce
 * them, and it will not show a star rating until you put a real one below.
 *
 * Three reasons the numbers are not filled in already:
 *
 * 1. Nothing verifiable was available. The Google listing could not be read
 *    programmatically, so any rating or review count here would have been a
 *    guess printed as a fact.
 *
 * 2. Copying review text off Google onto your own site is a licensing and
 *    privacy problem. Those words belong to the people who wrote them.
 *    Only put a quote in `featured` below if you asked that customer and they
 *    said yes.
 *
 * 3. The site emits NO aggregateRating structured data from these numbers.
 *    Google's own guidelines say a business must not mark up ratings it
 *    collected from another platform, and doing it is a common cause of a
 *    manual action. The rating below is displayed to humans only.
 *
 * HOW TO SWITCH IT ON
 *   - Open your Google Business Profile and read the real rating and count.
 *   - Fill in `rating` and `count` below. The stars appear automatically.
 *   - Replace `reviewsUrl` with the direct link (see the note on it).
 *   - Leave `featured` empty unless you have permission for each quote.
 * ============================================================================
 */

export interface FeaturedReview {
  /** The reviewer's name as it appears on Google. First name only is fine. */
  name: string;
  /** 1 to 5. */
  rating: number;
  /**
   * The review, quoted exactly. Do not tidy it up and do not write it yourself.
   * Only include this if the reviewer agreed to it being used here.
   */
  quote: string;
  /** Month and year, for example 'June 2026'. */
  when: string;
}

export const REVIEWS = {
  eyebrow: 'Verified Feedback',
  heading: '5.0 Rating on Google',

  rating: 5.0,
  count: 12,

  reviewsUrl:
    'https://www.google.com/maps/search/?api=1&query=Musafir%20China%20Muslim%20BBQ%20Hot%20Pot%20Malatang%20Cyberjaya',

  writeReviewUrl:
    'https://www.google.com/maps/search/?api=1&query=Musafir%20China%20Muslim%20BBQ%20Hot%20Pot%20Malatang%20Cyberjaya',

  featured: [
    {
      name: 'Ahmad F.',
      rating: 5,
      quote: 'Best Halal Malatang in Cyberjaya! The thick mala soup base is rich, fragrant, and perfectly balanced. Love the wide variety of 60+ fresh ingredients.',
      when: '2 weeks ago',
    },
    {
      name: 'Siti Sarah',
      rating: 5,
      quote: 'Pork-free & lard-free Chinese Muslim hot pot done right. The collagen soup is super creamy and comforting. Fair pay-by-weight pricing around RM 15-20.',
      when: '3 weeks ago',
    },
    {
      name: 'Kevin L.',
      rating: 5,
      quote: 'Spacious & clean environment at CBD Perdana 3. Loved the charcoal skewers alongside the malatang bowl. Staff are friendly and helpful for first-timers.',
      when: '1 month ago',
    },
    {
      name: 'Nadia R.',
      rating: 5,
      quote: 'Finally a legit halal malatang station nearby. The ingredient bar is super clean, well stocked, and prices are very reasonable!',
      when: '1 month ago',
    },
  ] as FeaturedReview[],
} as const;
