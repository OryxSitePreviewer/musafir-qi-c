import { isCertified } from '../src/lib/halalStatus.ts';
import { HALAL } from '../src/data/halal.ts';

let pass = 0;
let fail = 0;

function check(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok) console.log(`      got  ${JSON.stringify(got)}\n      want ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
}

const full = {
  status: 'certified',
  certifier: 'JAKIM',
  number: 'MS1500/2026/0001',
  expiry: '31 December 2028',
};

// The only combination that may print a certification claim.
check('complete and certified', isCertified(full), true);

// Every partial edit must fall back, not through.
check('status still in progress', isCertified({ ...full, status: 'in-progress' }), false);
check('missing certifier', isCertified({ ...full, certifier: '' }), false);
check('missing number', isCertified({ ...full, number: '' }), false);
check('missing expiry', isCertified({ ...full, expiry: '' }), false);
check('whitespace certifier', isCertified({ ...full, certifier: '   ' }), false);
check('whitespace number', isCertified({ ...full, number: '\t' }), false);
check('whitespace expiry', isCertified({ ...full, expiry: ' \n ' }), false);
check('everything empty', isCertified({ status: '', certifier: '', number: '', expiry: '' }), false);
check('typo in status', isCertified({ ...full, status: 'Certified' }), false);

// The live data file must not be claiming certification. This is the test that
// actually protects the site. If someone fills in the fields without the
// certificate in hand, this stays green, so it is not a substitute for judgement,
// but it does catch an accidental flip.
check(
  'shipped data does not claim certification',
  isCertified(HALAL.certification),
  false
);

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
