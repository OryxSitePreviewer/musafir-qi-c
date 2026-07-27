/**
 * About page copy.
 *
 * Kept in the data layer so the owner can rewrite the story without touching markup.
 */

export interface AboutSection {
  heading: string;
  /** Each string is one paragraph. */
  paragraphs: string[];
}

export const ABOUT_INTRO =
  'Musafir Qi Malatang started with a plain observation. Malatang is one of the best things you can eat for the money, and almost nobody in Malaysia could eat it without first asking whether it was safe for them.';

export const ABOUT_SECTIONS: AboutSection[] = [
  {
    heading: 'What Musafir means here',
    paragraphs: [
      'Musafir means traveller. In Malay and in Arabic it carries the same sense, someone on a journey, away from home, who needs feeding.',
      'Malatang itself is a traveller. It came out of the Yangtze river ports in Sichuan, where boatmen cooked whatever they had in a shared pot of chilli and peppercorn broth. It moved inland, through Chongqing, across China, and eventually here.',
      'The name is a promise about who the food is for. A traveller does not get to check the kitchen. They have to be able to walk in and eat. That is the standard we hold ourselves to.',
    ],
  },
  {
    heading: 'Why we built it pick and weigh',
    paragraphs: [
      'A set menu makes the restaurant the one deciding what you eat. We did not want that. Some people want six kinds of vegetable and no noodle. Some people want nothing but beef and tofu puffs. Both are correct.',
      'So you take a bowl, walk the bar, and fill it yourself. Over 60 ingredients sit out in front of you. You take what you want, as much as you want, and you pay for the weight of it. Nobody portions it for you and nobody upsells you.',
      'It also solves the honesty problem. You can see every ingredient before it goes in your bowl. Nothing is hidden in a sauce or under a lid.',
    ],
  },
  {
    heading: 'Pork free and lard free, without an asterisk',
    paragraphs: [
      'This is a Chinese Muslim style kitchen. There is no pork and no pork product anywhere in the building, because we do not buy it. There is no lard in any stock, any sauce, or any wok, because we cook in vegetable oil. There is no cooking wine.',
      'Meat, seafood, and vegetables sit in separate trays with their own tongs, and staff change gloves between the raw bar and the cooking line.',
      'We publish our halal certification status openly rather than implying it. If the paperwork is not on this website, it is because it is not yet in our hands, and we will say so. Ask at the counter and staff will show you what we currently hold.',
    ],
  },
  {
    heading: 'How we buy ingredients',
    paragraphs: [
      'Vegetables come in fresh and go out the same day. What sits on the bar at 10 in the morning is not what sits there at 8 at night, because we restock through the day rather than filling the trays once and letting them wilt.',
      'Meat comes from halal certified suppliers only, and we keep the supplier documents on file at each outlet.',
      'The mala base is made in house. Sichuan peppercorn, dried chilli, star anise, and beef bone, simmered long. It is not a bought paste thinned with water, which is why it tastes different from the malatang two doors down.',
    ],
  },
  {
    heading: 'The room',
    paragraphs: [
      'We built both outlets with space, which is unusual for this kind of shop. Long tables, room between chairs, and somewhere to park a stroller.',
      'The sign outside is loud on purpose. Red, gold, and hard to miss. Inside it is quieter than you would expect from the frontage. You are meant to sit down, take your time, and finish the bowl.',
    ],
  },
];

export const ABOUT_STATS = [
  { value: '60+', label: 'Fresh ingredients on the bar' },
  { value: '2', label: 'Outlets in the Klang Valley' },
  { value: '0', label: 'Pork or lard in the kitchen' },
  { value: '5', label: 'Spice levels, from none to extra' },
];
