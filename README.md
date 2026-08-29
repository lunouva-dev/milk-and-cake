# Milk & Cake

Public cake-pop storefront and order-request experience for Milk & Cake.

## Commands

- `npm run dev` starts the local site.
- `npm run build` creates the production build.
- `npm test` validates the build and order-request rules.
- `npm run db:generate` generates D1 migrations after schema changes.

The public order form stores requests in D1. The protected `/admin` inbox uses ChatGPT sign-in plus a one-time owner claim code.
