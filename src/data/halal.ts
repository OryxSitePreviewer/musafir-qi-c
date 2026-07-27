/**
 * Halal and pork-free assurance.
 *
 * ============================================================================
 * TODO FOR THE OWNER, READ THIS BEFORE LAUNCH
 * ============================================================================
 * The `certificationStatement` below is deliberately written without naming a
 * certifying authority and without a certificate number, because nobody supplied
 * one. Replace it with your exact wording.
 *
 * If you hold JAKIM certification, state it and give the certificate number and
 * expiry. If you hold a state authority certificate, name the state authority. If
 * certification is still in progress, say so plainly and give the honest status.
 *
 * Do not add a JAKIM logo, a certificate number, or the word "certified" to this
 * file or to any page unless you hold the document. Misstating halal status is a
 * legal problem in Malaysia under the Trade Descriptions Act, not just a marketing
 * problem.
 * ============================================================================
 */

export interface KitchenPolicy {
  title: string;
  detail: string;
}

export const HALAL = {
  heading: 'Pork free and lard free, in the kitchen and on the bar',

  intro:
    'This is a Chinese Muslim style kitchen. That is not a label we put on the sign, it is how the room is stocked and run.',

  /**
   * TODO: replace this entire string with the owner's exact certification wording.
   * It currently states only what can be stated honestly with no document in hand.
   */
  certificationStatement:
    'TODO: replace with your exact halal certification wording before launch.',

  /**
   * Shown on the page in place of the certification statement until the owner
   * fills in the real wording. Keep this honest.
   */
  certificationFallback:
    'We do not display a halal certificate on this website yet. We will publish the certifying authority, the certificate number, and the expiry date here as soon as the document is in hand. Until then, ask at the counter and our staff will show you the current paperwork and answer any question about how the kitchen is run.',

  policies: [
    {
      title: 'No pork in the building',
      detail:
        'We do not buy, store, or serve pork or any pork product. It does not come through the back door, so it cannot end up in your bowl.',
    },
    {
      title: 'No lard, ever',
      detail:
        'Every base is built on beef bone, chicken bone, or vegetable stock. We cook in vegetable oil. There is no lard in the stockpot and none in the wok.',
    },
    {
      title: 'Separate handling',
      detail:
        'Meat, seafood, and vegetables sit in separate trays with their own tongs. Staff change gloves between the raw bar and the cooking line.',
    },
    {
      title: 'No alcohol in the cooking',
      detail:
        'No cooking wine, no rice wine, no mirin. The depth in the mala base comes from peppercorn, chilli, and long simmering.',
    },
  ] satisfies KitchenPolicy[],
} as const;
