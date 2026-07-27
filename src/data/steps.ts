/**
 * The four step pick-and-weigh flow, and the first timer guide.
 *
 * The short `summary` runs on the home page. The `detail` and `tips` run on
 * /how-it-works. Keep the order. It is a sequence and a first timer follows it.
 */

export interface Step {
  number: number;
  title: string;
  /** One sentence. Used on the home page. */
  summary: string;
  /** Expanded copy. Used on the How It Works page. */
  detail: string;
  tips: string[];
  /** Icon key. See src/components/Icon.astro */
  icon: 'bowl' | 'tongs' | 'pot' | 'scale';
}

export const STEPS: Step[] = [
  {
    number: 1,
    title: 'Take a bowl',
    summary: 'Grab a bowl and a pair of tongs from the stack at the front of the ingredient bar.',
    detail:
      'Bowls and tongs sit at the front of the bar. Take one bowl per person. If you are eating with someone, do not share a bowl, because everything is weighed together and cooked in one base.',
    tips: [
      'One bowl per person, one soup base per bowl.',
      'The bowls look smaller than they are. Most people overfill on their first visit.',
    ],
    icon: 'bowl',
  },
  {
    number: 2,
    title: 'Fill it from the bar',
    summary: 'Walk the bar and pick whatever you want from over 60 fresh ingredients.',
    detail:
      'Work your way along the bar with the tongs. Meatballs and sliced meat first, then vegetables, noodles, tofu, and seafood. Take as much or as little as you want of anything. Nothing is portioned for you and nothing is off limits.',
    tips: [
      'Take one kind of noodle, not two. Noodles are the heaviest thing on the bar.',
      'Tofu puffs and bean curd skin weigh almost nothing and soak up the most soup.',
      'Leafy greens shrink once cooked, so take more than looks right.',
    ],
    icon: 'tongs',
  },
  {
    number: 3,
    title: 'Pick your soup and heat',
    summary: 'Choose a soup base at the counter and tell staff how spicy you want it.',
    detail:
      'Hand your bowl over and name your base. Mala if you want the numbing heat, collagen if you want it rich and mild, tomato or clear broth if you want it light. If you pick mala, name a spice level from zero to four. If you want it dry instead of soup, ask for the mala stir-fried version.',
    tips: [
      'First time with mala, start at level one or two. You can go up next visit.',
      'The collagen base has no chilli in it at all.',
      'Spice level is set before cooking. It cannot be changed once the bowl goes in.',
    ],
    icon: 'pot',
  },
  {
    number: 4,
    title: 'Weigh and pay',
    summary: 'We weigh your bowl, you pay by weight, and we cook it while you sit down.',
    detail:
      'Your bowl goes on the scale and the price comes straight off the weight. You pay at the counter, take a number, and sit down. Cooking takes about five to eight minutes, longer over the lunch and dinner rush.',
    tips: [
      'You pay before it is cooked, not after you eat.',
      'If the total surprises you, say so at the scale. You can put things back before you pay.',
    ],
    icon: 'scale',
  },
];

export interface FirstTimerTopic {
  heading: string;
  body: string;
}

export const FIRST_TIMER_GUIDE: FirstTimerTopic[] = [
  {
    heading: 'How much to take for one person',
    body:
      'Aim for 400 to 500 grams. In practice that is one kind of noodle, three or four proteins, and a good handful of vegetables. Noodles carry the most weight, so pick one and stop. If you want to eat light, skip the noodle entirely and load up on vegetables and tofu puffs, which weigh next to nothing. You can always go back to the bar for more before you pay.',
  },
  {
    heading: 'Which soup base to start with',
    body:
      'Start with the Thick and Spicy Mala Soup at level one or two if you want to know what this place is actually about. It is the reason most people come back. If you do not want chilli at all, take the Creamy Collagen Soup, which is thick, milky, and mild. Bring children to the tomato base. If you want no soup at all, ask for the mala stir-fried version, which goes into the wok instead of the pot.',
  },
  {
    heading: 'What the spice levels actually mean',
    body:
      'Mala is two sensations, not one. The chilli brings heat and the Sichuan peppercorn brings a numbing tingle in your lips. Level zero has neither. Level one leans on the peppercorn and barely burns. Level two is where most regulars sit. Level three has real heat that builds through the bowl. Level four is for people who already know they like mala. Order the level down from where you think you are, because the soup gets hotter as you work through the bowl.',
  },
  {
    heading: 'What to do while you wait',
    body:
      'Take your number to a table and sit down. Chinese tea is refillable. If you ordered level three or four, get something sweet and cold now rather than halfway through the bowl. Water does not help with capsaicin. Soya milk does.',
  },
];
