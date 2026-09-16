# SoleStore

A full-stack sneaker marketplace built with Next.js, PostgreSQL and Stripe.

**[Live demo](https://solestore-sigma.vercel.app)**

---

## What it does

**Storefront** — Browse a catalog of 50+ sneakers with search, category
filtering and sorting. Every product has its own indexable page with
dynamic metadata and Open Graph tags.

**Cart & checkout** — Persistent cart backed by localStorage, Stripe
Checkout for payment, and a signed webhook that confirms the order and
decrements stock inside a database transaction.

**Customer account** — Order history with live status, saved products,
and reviews restricted to verified purchases.

**Admin dashboard** — Revenue and stock overview, full product CRUD,
order fulfillment with a constrained status workflow, and category
management.

---

## Stack

| Layer      | Choice                                                     |
| ---------- | ---------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Server Components, Server Actions) |
| Language   | TypeScript                                                 |
| Database   | PostgreSQL (Neon) + Prisma 7                               |
| Auth       | Auth.js with credentials and role-based access             |
| Payments   | Stripe Checkout + webhooks                                 |
| Styling    | Tailwind CSS                                               |
| Validation | Zod, shared between client and server                      |
| Hosting    | Vercel                                                     |

---

## Engineering decisions

**Prices are stored as integers in cents.** Floating-point arithmetic
breaks on money (`0.1 + 0.2 !== 0.3`), and Stripe expects cents anyway.
Conversion happens once, at the server boundary.

**Filters live in the URL, not in component state.** A filtered view is
shareable, bookmarkable, and survives the back button. Filtering also
runs in PostgreSQL rather than in the browser, so it scales past the
50 products currently seeded.

**The client never sends prices.** Checkout accepts product IDs and
quantities only; the server reloads every product, revalidates stock,
and recomputes the total before creating a Stripe session.

**The webhook is the source of truth, not the redirect.** A customer can
close the tab before returning to the site. The webhook verifies
Stripe's signature, ignores duplicate events, and updates the order and
stock atomically.

**Products are deactivated, never deleted.** `OrderItem` references
`Product` without cascade, and order history has to stay intact. Line
items also store the price paid at purchase time.

**Order status follows a state machine.** Transitions are declared in
one place — a delivered order cannot go back to pending, and only the
Stripe webhook can mark an order as paid.

**Every admin Server Action checks the role itself.** The admin layout
protects rendering, but Server Actions are independent entry points
reachable by direct POST.

---

## Running locally

```bash
git clone https://github.com/djanbalde7-alt/solestore.git
cd solestore
npm install
```

Create a `.env` file:
