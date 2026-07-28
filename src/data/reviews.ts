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
  eyebrow: 'What people say',
  heading: 'Reviews on Google',

  /**
   * TODO: replace with the real average from your Google Business Profile.
   * Leave as null and the section shows the honest version with no stars.
   */
  rating: null as number | null,

  /** TODO: replace with the real number of reviews. Leave null to hide it. */
  count: null as number | null,

  /**
   * The Google listing.
   *
   * TODO: replace with the direct review link. To get it, open your listing in
   * Google Maps, press Share, and copy the short link. The URL below is a plain
   * search, which works but drops people on a results page rather than on the
   * listing. Do not paste a URL copied out of the browser bar on a search results
   * page, because those carry session parameters that stop working within days.
   */
  reviewsUrl:
    'https://www.google.com/maps/search/?api=1&query=Musafir%20China%20Muslim%20BBQ%20Hot%20Pot%20Malatang%20Cyberjaya',

  /** Link used by the "leave a review" button. Same caveat as above. */
  writeReviewUrl:
    'https://www.google.com/maps/search/?api=1&query=Musafir%20China%20Muslim%20BBQ%20Hot%20Pot%20Malatang%20Cyberjaya',

  /**
   * TODO: only add entries here for reviewers who gave permission.
   * An empty array is the correct state until then, and the section handles it.
   */
  featured: [] as FeaturedReview[],
} as const;
