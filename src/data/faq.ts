/**
 * Frequently asked questions.
 *
 * These feed both the accordion on the home page and the FAQPage JSON-LD, so keep
 * the answers written as plain sentences. No markup in the answer strings.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'How does the pricing work?',
    answer:
      'You take a bowl, fill it from the ingredient bar with whatever you want, and bring it to the counter. We weigh it and charge you by weight. There is no per item price and no set menu. A normal single bowl lands around 400 to 500 grams. Use the estimator on this page to see roughly where your bowl will come out.',
  },
  {
    question: 'Is the food halal?',
    // TODO: confirm with owner. Replace this answer once the certification status is
    // final. Do not name a certifying body or a certificate number until the owner
    // supplies the document. See src/data/halal.ts.
    answer:
      'The kitchen is pork free and lard free. We do not carry pork, pork products, or lard in the building, and we do not use alcohol in the cooking. Our halal certification status is listed on the assurance section of this page. Ask any staff member at the counter and they will show you the current documents.',
  },
  {
    question: 'How spicy is the mala?',
    answer:
      'You choose. The mala soup runs from no chilli up to extra spicy across five levels. Level one is mild and tastes more of the numbing Sichuan peppercorn than of burn. Level three has real heat. Level four is for people who already know they like mala. Tell the staff your level when you hand over your bowl.',
  },
  {
    question: 'Is there a non-spicy option?',
    answer:
      'Yes. The Creamy Collagen Soup has no chilli in it at all, and the mala base can be ordered at level zero with no chilli oil and no peppercorn. Tomato soup and clear chicken broth are also on the counter. Children usually go for the tomato.',
  },
  {
    question: 'Can children eat here?',
    answer:
      'Yes. Order the collagen or tomato base at no chilli and let them pick their own ingredients, which most children enjoy more than the eating. High chairs are available at both outlets. Ask staff to cut noodles short for small children.',
  },
  {
    question: 'Is there parking?',
    answer:
      'At Cyberjaya there is open surface parking along the CBD Perdana 3 shop row, and it is free after office hours. At Kuala Lumpur use the MyTOWN multi storey car park and take the lift down to Level B1. Mall parking rates apply there.',
  },
  {
    question: 'Do you have seating for a group or a family?',
    answer:
      'Yes. The Cyberjaya outlet has long tables that seat eight and room to park a stroller beside you. The Kuala Lumpur outlet seats smaller groups more comfortably. For a party of ten or more, message us on WhatsApp the day before so we can hold tables together.',
    // TODO: confirm with owner whether groups can actually reserve, and what the
    // minimum size and notice period are.
  },
  {
    question: 'Do you take walk-ins?',
    answer:
      'Walk-ins are how this works. There is no booking and no waiting list. Come in, take a bowl, and start filling. The busiest windows are 12:30 to 1:30 PM on weekdays and 7 to 9 PM on weekends.',
  },
  {
    question: 'Do you deliver?',
    // TODO: confirm with owner which delivery platforms are live at each outlet, then
    // replace this with the platform names and add direct links.
    answer:
      'Delivery is available through the major food delivery apps for both outlets. Search for Musafir Qi Malatang or Dr.MaLa in your app. Delivery orders are picked from a set list rather than the full bar, because the bar is a walk-in counter. Message us on WhatsApp if you want to check what is available before you order.',
  },
  {
    question: 'What payment methods do you take?',
    // TODO: confirm with owner. Card brands and e-wallet coverage need checking.
    answer:
      'Cash, debit and credit cards, DuitNow QR, and the common e-wallets including Touch n Go and GrabPay. You pay at the counter after your bowl is weighed and before it is cooked.',
  },
  {
    question: 'How much should I take for one person?',
    answer:
      'Around 400 to 500 grams fills most adults. Take one noodle, three or four proteins, and a handful of vegetables, and you will land in that range. Noodles are the heaviest thing on the bar, so take one kind rather than two. You can always go back for more.',
  },
  {
    question: 'How long does it take once I hand over my bowl?',
    // TODO: confirm with owner. Timing below is an estimate.
    answer:
      'Around five to eight minutes at a normal hour, and longer over the lunch and dinner rush. Your bowl is cooked to order in the base you picked, so it is not sitting under a lamp waiting for you.',
  },
];
