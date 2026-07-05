/**
 * Programme configuration, GCSA Training
 *
 * Single source of truth for programme metadata and pricing. Used by the
 * registration modal (display) and the registration API route (server-side
 * lookup). No payment is collected online, registrations are captured to the
 * database and the team follows up with fees and payment options.
 *
 * Fee structure (Transition to Architecture), for reference only:
 *  - £300 registration fee  - secures the cohort place
 *  - £1,200 course fee       - payable in full, or in 4 weekly
 *                              instalments of £300 each
 *  - £1,500 total
 */

export const PROGRAMMES = {
  "transition-to-architecture": {
    id: "transition-to-architecture",
    name: "Transition to Architecture in 6 Weeks",
    description:
      "A 6-week intensive, hands on programme to fast track professionals into architecture roles.",
    currency: "gbp",

    // ── Fee breakdown (all amounts in pence), reference only ──────────
    registrationFeeInPence: 30000, //   £300  - secures your place
    courseFeeInPence: 120000, //       £1,200 - tuition
    instalments: 4, //                 weekly instalments for the course fee
    instalmentAmountInPence: 30000, // £300/week × 4
  },
};

export const getProgramme = (id) => PROGRAMMES[id] || null;

/** Total programme cost (registration + course) in pence. */
export const totalInPence = (p) =>
  p.registrationFeeInPence + p.courseFeeInPence;

/** Format a pence amount as a GBP string, e.g. 120000 → "£1,200". */
export const formatGBP = (pence) =>
  `£${(pence / 100).toLocaleString("en-GB", {
    minimumFractionDigits: pence % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
