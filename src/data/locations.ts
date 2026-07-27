/**
 * Outlets.
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
}

// TODO: confirm with owner. Both outlets currently share one placeholder WhatsApp
// number from site.ts. Replace with the real per-outlet numbers if they differ.
const PLACEHOLDER_WHATSAPP = '60120000000';

export const LOCATIONS: Location[] = [
  {
    id: 'cyberjaya',
    name: 'Cyberjaya',
    fullName: 'Musafir Qi Malatang Cyberjaya',
    streetAddress: 'CBD Perdana 3',
    locality: 'Cyberjaya',
    region: 'Selangor',
    postalCode: '63000',
    country: 'MY',
    shortAddress: 'CBD Perdana 3, Cyberjaya, Selangor',
    geo: { lat: 2.9188, lng: 101.6541 },
    hours: [{ opens: '10:30', closes: '23:30', days: ALL_DAYS }],
    hoursDisplay: '10:30 AM to 11:30 PM, daily',
    phoneDisplay: '+60 12-000 0000',
    whatsappNumber: PLACEHOLDER_WHATSAPP,
    parking:
      'Open surface parking runs along the CBD Perdana 3 shop row and is free after office hours. Arrive before 12:30 PM on a weekday and you will still find a bay near the door.',
    landmarks: [
      'CBD Perdana 3 shop row',
      'Walking distance from Cyberjaya City Centre',
      'Ten minutes from MMU and Limkokwing campuses',
    ],
    room: 'The larger of the two rooms, with long tables that seat eight and space to park a stroller beside you.',
    image: '/images/outlet-cyberjaya.webp',
    imageAlt:
      'The Musafir Qi Malatang Cyberjaya shopfront at CBD Perdana 3 with red signage and glass frontage',
  },
  {
    id: 'kuala-lumpur',
    name: 'Kuala Lumpur',
    fullName: 'Musafir Qi Malatang MyTOWN',
    streetAddress: 'MyTOWN Shopping Centre, Level B1',
    locality: 'Kuala Lumpur',
    region: 'Wilayah Persekutuan Kuala Lumpur',
    postalCode: '55100',
    country: 'MY',
    shortAddress: 'MyTOWN Shopping Centre, Level B1, Kuala Lumpur',
    geo: { lat: 3.129, lng: 101.7223 },
    hours: [{ opens: '10:00', closes: '22:00', days: ALL_DAYS }],
    hoursDisplay: '10:00 AM to 10:00 PM, daily',
    phoneDisplay: '+60 12-000 0000',
    whatsappNumber: PLACEHOLDER_WHATSAPP,
    parking:
      'Use the MyTOWN multi storey car park and take the lift down to B1. Mall parking rates apply. The IKEA Cheras car park connects on the same level if MyTOWN fills up on a weekend.',
    landmarks: [
      'MyTOWN Shopping Centre, Level B1',
      'Connected to IKEA Cheras',
      'Five minutes on foot from Cochrane MRT station',
    ],
    room: 'A mall unit on the lower ground floor, air conditioned, with high chairs available at the counter.',
    image: '/images/outlet-kuala-lumpur.webp',
    imageAlt:
      'The Musafir Qi Malatang outlet on Level B1 of MyTOWN Shopping Centre in Kuala Lumpur',
  },
];

/** Builds a Google Maps directions URL. Works without an API key. */
export function directionsLink(location: Location): string {
  const query = `${location.fullName}, ${location.shortAddress}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

/** Builds a Google Maps embed URL. Works without an API key. */
export function mapEmbedLink(location: Location): string {
  const query = `${location.streetAddress}, ${location.locality}, ${location.region}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
}
