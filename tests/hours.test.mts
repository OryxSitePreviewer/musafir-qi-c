import { getOpenState, formatTime, malaysiaNow } from '../src/lib/openStatus.ts';

const ALL = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const cyber = [{ opens: '10:30', closes: '23:30', days: ALL }];
const kl    = [{ opens: '10:00', closes: '22:00', days: ALL }];
const overnight = [{ opens: '18:00', closes: '02:00', days: ALL }];
const weekdayOnly = [{ opens: '09:00', closes: '17:00', days: ['Monday','Tuesday','Wednesday','Thursday','Friday'] }];

// A UTC instant maps to KL time by +8 hours.
const at = (isoUtc: string) => new Date(isoUtc);

let pass = 0, fail = 0;
function check(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok) console.log(`      got  ${JSON.stringify(got)}\n      want ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
}

// 2026-07-27 is a Monday.
check('formatTime 23:30', formatTime('23:30'), '11:30 PM');
check('formatTime 10:00', formatTime('10:00'), '10:00 AM');
check('formatTime 00:00', formatTime('00:00'), '12:00 AM');
check('formatTime 12:00', formatTime('12:00'), '12:00 PM');

// 04:00 UTC = 12:00 KL, Monday. Both open.
check('cyber midday open', getOpenState(cyber, at('2026-07-27T04:00:00Z')), { isOpen: true, label: 'Open now', detail: 'Until 11:30 PM' });
check('kl midday open',    getOpenState(kl,    at('2026-07-27T04:00:00Z')), { isOpen: true, label: 'Open now', detail: 'Until 10:00 PM' });

// 01:00 UTC = 09:00 KL. Both shut, opening later today.
check('cyber before open', getOpenState(cyber, at('2026-07-27T01:00:00Z')), { isOpen: false, label: 'Closed', detail: 'Opens 10:30 AM today' });

// 15:00 UTC = 23:00 KL. Cyberjaya closes in 30 min, KL already shut until tomorrow.
check('cyber closing soon', getOpenState(cyber, at('2026-07-27T15:00:00Z')), { isOpen: true, label: 'Open now', detail: 'Closing in 30 min' });
check('kl after close',     getOpenState(kl,    at('2026-07-27T15:00:00Z')), { isOpen: false, label: 'Closed', detail: 'Opens 10:00 AM tomorrow' });

// 16:00 UTC = 00:00 KL Tuesday. Cyberjaya shut, opens later that same day.
check('cyber after midnight', getOpenState(cyber, at('2026-07-27T16:00:00Z')), { isOpen: false, label: 'Closed', detail: 'Opens 10:30 AM today' });

// Overnight rule, 17:00 UTC = 01:00 KL Tuesday, still inside Monday's shift.
check('overnight still open', getOpenState(overnight, at('2026-07-27T17:00:00Z')), { isOpen: true, label: 'Open now', detail: 'Until 2:00 AM' });
// 19:00 UTC = 03:00 KL Tuesday, shift ended.
check('overnight closed', getOpenState(overnight, at('2026-07-27T19:00:00Z')), { isOpen: false, label: 'Closed', detail: 'Opens 6:00 PM today' });

// Weekday-only rule on a Saturday. 2026-08-01 is a Saturday. 04:00 UTC = 12:00 KL.
check('weekday rule on Saturday', getOpenState(weekdayOnly, at('2026-08-01T04:00:00Z')), { isOpen: false, label: 'Closed', detail: 'Opens 9:00 AM on Monday' });

// Timezone independence: the same instant must give the same answer whatever the host TZ.
const instant = at('2026-07-27T15:00:00Z');
check('tz independent', getOpenState(cyber, instant).detail, 'Closing in 30 min');
check('malaysiaNow minutes', malaysiaNow(instant).minutes, 23 * 60);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
