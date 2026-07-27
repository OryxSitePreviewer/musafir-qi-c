/**
 * Open or closed, computed in the browser in Asia/Kuala_Lumpur time.
 *
 * The visitor's own clock and time zone are ignored on purpose. Someone checking
 * from Singapore, Jakarta, or London should see whether the shop is open in
 * Malaysia, not whether it is open where they are standing.
 *
 * This runs on the client only. Rendering it at build time would bake in a
 * timestamp that goes stale the moment the page is cached.
 */

export interface HoursRule {
  opens: string;
  closes: string;
  days: string[];
}

export interface OpenState {
  isOpen: boolean;
  /** Short label for the badge, for example "Open now" or "Closed". */
  label: string;
  /** Supporting line, for example "Until 11:30 PM" or "Opens 10:30 AM". */
  detail: string;
}

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

/** Current day index and minute of day in Malaysian local time. */
export function malaysiaNow(now: Date = new Date()): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kuala_Lumpur',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '';

  const day = DAY_NAMES.indexOf(get('weekday'));
  // Intl can return "24" for midnight with hour12 false in some engines.
  const hour = Number(get('hour')) % 24;
  const minute = Number(get('minute'));

  return { day: day === -1 ? now.getDay() : day, minutes: hour * 60 + minute };
}

function toMinutes(time: string): number {
  const [hour = '0', minute = '0'] = time.split(':');
  return Number(hour) * 60 + Number(minute);
}

/** Turns "23:30" into "11:30 PM". */
export function formatTime(time: string): string {
  const total = toMinutes(time);
  const hour24 = Math.floor(total / 60) % 24;
  const minute = total % 60;
  const suffix = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${suffix}`;
}

/**
 * Works out whether an outlet is open right now.
 * Handles rules that run past midnight, for example 18:00 to 02:00.
 */
export function getOpenState(rules: HoursRule[], now: Date = new Date()): OpenState {
  const { day, minutes } = malaysiaNow(now);
  const todayName = DAY_NAMES[day] ?? '';
  const yesterdayName = DAY_NAMES[(day + 6) % 7] ?? '';

  for (const rule of rules) {
    const opens = toMinutes(rule.opens);
    const closes = toMinutes(rule.closes);
    const overnight = closes <= opens;

    // A shift that started yesterday and has not closed yet.
    if (overnight && rule.days.includes(yesterdayName) && minutes < closes) {
      return {
        isOpen: true,
        label: 'Open now',
        detail: `Until ${formatTime(rule.closes)}`,
      };
    }

    if (!rule.days.includes(todayName)) continue;

    const closingMinute = overnight ? closes + 24 * 60 : closes;
    if (minutes >= opens && minutes < closingMinute) {
      const untilClose = closingMinute - minutes;
      return {
        isOpen: true,
        label: 'Open now',
        detail:
          untilClose <= 60
            ? `Closing in ${untilClose} min`
            : `Until ${formatTime(rule.closes)}`,
      };
    }
  }

  // Closed. Find the next opening time, looking up to a week ahead.
  for (let offset = 0; offset < 8; offset += 1) {
    const dayName = DAY_NAMES[(day + offset) % 7] ?? '';
    for (const rule of rules) {
      if (!rule.days.includes(dayName)) continue;
      const opens = toMinutes(rule.opens);
      if (offset === 0 && opens <= minutes) continue;
      const when =
        offset === 0 ? 'today' : offset === 1 ? 'tomorrow' : `on ${dayName}`;
      return {
        isOpen: false,
        label: 'Closed',
        detail: `Opens ${formatTime(rule.opens)} ${when}`,
      };
    }
  }

  return { isOpen: false, label: 'Closed', detail: 'Check back soon' };
}
