/**
 * The one function that decides whether this site is allowed to print a halal
 * certification claim.
 *
 * It lives here rather than inline in the component so it can be tested, because
 * getting it wrong is a Trade Descriptions Act problem in Malaysia and not a
 * cosmetic bug. See tests/halal.test.mts.
 *
 * The rule: print the certified wording only when the owner has explicitly set the
 * status to 'certified' AND supplied all three of the certifier, the certificate
 * number, and the expiry. A half finished edit falls back to "in progress", never
 * the other way round.
 */

export interface CertificationInput {
  status: string;
  certifier: string;
  number: string;
  expiry: string;
}

export function isCertified(certification: CertificationInput): boolean {
  return (
    certification.status === 'certified' &&
    certification.certifier.trim().length > 0 &&
    certification.number.trim().length > 0 &&
    certification.expiry.trim().length > 0
  );
}
