/**
 * Outlet.
 *
 * Hours drive three things: the printed opening hours, the JSON-LD
 * openingHoursSpecification, and the live open or closed badge that the browser
 * computes in Asia/Kuala_Lumpur time. Change the hours here and all three follow.
 *
 * Times are 24 hour "HH:MM" strings in Malaysian local time.
 */

export interface OpeningHours {
  /** 24 hour local opening time, for example "10:30". */
  opens: string;
  /** 24 hour local closing time, for example "23:30". */
  closes: string;
  /**
   * Days this rule applies to, using schema.org day names.
   * All seven days means the outlet is open daily.
   */
  days: DayOfWeek[];
}

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export const ALL_DAYS: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export interface Location {
  id: string;
  /** Short name used in navigation and headings. */
  name: string;
  /** Full outlet name used in structured data. */
  fullName: string;
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
  /** One line address for cards and the footer. */
  shortAddress: string;
  /**
   * TODO: confirm with owner. Coordinates below are approximate, taken from the
   * mall and district centre. Drop a pin on the exact shopfront and replace them,
   * because Google uses these for the map and for local search.
   */
  geo: { lat: number; lng: number };
  hours: OpeningHours[];
  /** Printed hours line. Written out because "10:30 AM to 11:30 PM" reads better than a table. */
  hoursDisplay: string;
  phoneDisplay: string;
  /** International format, no plus sign or spaces. Used for the WhatsApp link. */
  whatsappNumber: string;
  parking: string;
  landmarks: string[];
  /** Short line about the room itself. */
  room: string;
  image: string;
  imageAlt: string;
  /** Optional second photograph. The locations page shows it under the first. */
  imageNight?: string;
  imageNightAlt?: string;
}

const OFFICIAL_WHATSAPP = '60179916692';

export const LOCATIONS: Location[] = [
  {
    id: 'cyberjaya',
    name: 'Cyberjaya',
    fullName: 'Musafir China Muslim BBQ& Hot Pot&Malatang',
    streetAddress: 'CBD Perdana 3',
    locality: 'Cyberjaya',
    region: 'Selangor',
    postalCode: '63000',
    country: 'MY',
    shortAddress: 'CBD Perdana 3, Cyberjaya, Selangor',
    geo: { lat: 2.9188, lng: 101.6541 },
    hours: [{ opens: '10:30', closes: '23:00', days: ALL_DAYS }],
    hoursDisplay: '10:30 AM to 11:00 PM, daily',
    phoneDisplay: '+60 17-991 6692',
    whatsappNumber: OFFICIAL_WHATSAPP,
    parking:
      'Open surface parking runs along the CBD Perdana 3 shop row and is free after office hours. Arrive before 12:30 PM on a weekday and you will still find a bay near the door.',
    landmarks: [
      'CBD Perdana 3 shop row',
      'Walking distance from Cyberjaya City Centre',
      'Ten minutes from MMU and Limkokwing campuses',
    ],
    room: 'An open corner unit with roadside seating under the awning, long tables that seat eight, and space to park a stroller beside you.',
    image: '/images/outlet-cyberjaya.webp',
    imageAlt:
      'The Musafir Qi Stesen Mala shopfront at CBD Perdana 3, photographed straight on. A wide red sign carries the Musafir Qi badge, the words Stesen Mala, and the line Hot Pot, Charcoal Skewers, Malatang, above a red awning and the open counter',
    imageNight: '/images/outlet-cyberjaya-night.webp',
    imageNightAlt:
      'The same shopfront after dark, with the sign lit orange and diners at the roadside tables under the awning',
  },
];

/** Builds a Google Maps directions URL. Works without an API key. */
export function directionsLink(_location: Location): string {
  return `https://www.google.com/maps/search/?api=1&query=Musafir%20China%20Muslim%20BBQ%20Hot%20Pot%20Malatang%20Cyberjaya`;
}

/** Builds a Waze navigation URL. */
export function wazeLink(location: Location): string {
  return `https://waze.com/ul?ll=${location.geo.lat},${location.geo.lng}&navigate=yes`;
}

/** Builds a Google Maps embed URL. Works without an API key. */
export function mapEmbedLink(location: Location): string {
  const query = `${location.streetAddress}, ${location.locality}, ${location.region}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
}
