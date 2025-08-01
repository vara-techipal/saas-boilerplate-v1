# Backend

Simple Express API using Prisma as ORM.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm run dev
   ```

## Environment Variables

Copy `.env.example` to `.env` and update the values as needed. In particular,
`APP_BASE_DOMAIN` defines the base domain used when generating tenant-specific
subdomains (for example `tenant1.mycompany.com`).
