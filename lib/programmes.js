/**
 * Programme configuration — GCSA Training
 *
 * Single source of truth for programme metadata and pricing.
 * Used by both the registration modal (display) and the Stripe
 * checkout API route (server-side price reference).
 *
 * IMPORTANT — Stripe security model:
 *  - Never trust the price the client sends. The server reads
 *    `priceInPence` from this map using the `programmeId` the
 *    client supplied, then creates the Stripe Checkout Session
 *    with the trusted server-side price.
 *  - For best practice, you can replace `priceInPence` with a
 *    Stripe `priceId` (price_xxx) created in the Stripe Dashboard.
 *    Then pass `{ price: PROGRAMMES[id].priceId, quantity: 1 }`
 *    instead of `price_data` in the checkout session.
 */

export const PROGRAMMES = {
  "transition-to-architecture": {
    id: "transition-to-architecture",
    name: "Transition to Architecture in 6 Weeks",
    description:
      "A 6-week intensive, hands-on programme to fast-track professionals into architecture roles.",
    priceInPence: 149500, // £1,495.00 — change here when pricing changes
    currency: "gbp",
    // OPTIONAL: replace priceInPence with a Stripe priceId
    // priceId: "price_1XXXXXXXXXXXX",
    successPath: "/training/success",
    cancelPath: "/training/cancelled",
  },
};

export const getProgramme = (id) => PROGRAMMES[id] || null;