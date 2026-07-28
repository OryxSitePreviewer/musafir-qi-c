/**
 * Halal and kitchen policy.
 *
 * ============================================================================
 * READ THIS BEFORE CHANGING THE CERTIFICATION WORDING
 * ============================================================================
 * The site currently states that JAKIM verification is IN PROGRESS. That is a
 * statement about an application, not a claim of certification, and the two are
 * not interchangeable.
 *
 * Do NOT write "JAKIM certified", "halal certified", or "halal approved", and do
 * NOT put a JAKIM logo anywhere on this site, until the certificate is issued and
 * in your hands. When it is, set `certification.status` to 'certified' and fill in
 * `certification.certifier`, `certification.number`, and `certification.expiry`.
 * The page prints the certified wording only when all three are present.
 *
 * Misstating halal status in Malaysia is an offence under the Trade Descriptions
 * (Certification and Marking of Halal) Order and the Trade Descriptions Act. It is
 * a legal exposure, not a marketing choice.
 * ============================================================================
 */

export interface KitchenPolicy {
  title: string;
  detail: string;
}

export type CertificationStatus = 'in-progress' | 'certified';

export const HALAL = {
  eyebrow: 'Halal kitchen',

  heading: 'No pork. No lard. No cooking wine. No alcohol.',

  intro:
    'This is a Chinese Muslim kitchen. The shopfront says Restoran Masakan Asli China Muslim, and that is how the room is stocked and run, not a line we put on a sign.',

  /** The four hard rules, stated as rules rather than as reassurance. */
  policies: [
    {
      title: 'No pork, anywhere',
      detail:
        'We do not buy, store, or serve pork or any pork product. It does not come through the back door, so it cannot reach your bowl.',
    },
    {
      title: 'No lard, in anything',
      detail:
        'Every base is built on beef bone, chicken bone, or vegetable stock, and we cook in vegetable oil. There is no lard in the stockpot, the wok, or the grill.',
    },
    {
      title: 'No cooking wine',
      detail:
        'No shaoxing, no rice wine, no mirin. The depth in the mala base comes from Sichuan peppercorn, dried chilli, star anise, and long simmering.',
    },
    {
      title: 'No alcohol on the premises',
      detail:
        'We do not cook with it and we do not sell it. There is no alcohol behind the counter and none in the fridge.',
    },
  ] satisfies KitchenPolicy[],

  /** Handling practice. Secondary to the four rules above. */
  handling:
    'Meat, seafood, and vegetables sit in separate trays with their own tongs, and staff change gloves between the raw bar and the cooking line. Meat comes from halal certified suppliers only, and we keep the supplier documents on file at the outlet.',

  certification: {
    /**
     * 'in-progress' prints the application wording.
     * 'certified' prints the certified wording, and ONLY if certifier, number, and
     * expiry are all filled in below. See src/components/HalalBand.astro.
     */
    status: 'in-progress' as CertificationStatus,

    heading: 'JAKIM certification',

    /** Printed while status is 'in-progress'. */
    inProgress:
      'Our JAKIM halal certification is in progress. We have applied and the verification is underway. We are not certified yet, and we will not say otherwise until the certificate is issued. When it is, the certifying body, the certificate number, and the expiry date will be published on this page.',

    /** Printed alongside either status. This is what a customer can act on today. */
    inTheMeantime:
      'What you can check today is the kitchen itself. Ask at the counter. Our staff will show you the supplier documents and answer any question about how the food is handled.',

    // TODO: fill these three in the day the certificate is issued, then change
    // status above to 'certified'. Leave them empty until then.
    certifier: '',
    number: '',
    expiry: '',
  },
} as const;
