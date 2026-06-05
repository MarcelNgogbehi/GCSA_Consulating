import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton.
 *
 * Next.js hot-reloads modules in development, which would otherwise create a
 * new PrismaClient (and a new connection pool) on every reload and exhaust
 * the database connections. Caching the instance on the global object keeps
 * a single client across reloads.
 *
 * Required env var:
 *  - DATABASE_URL   postgresql://user:pass@host:5432/dbname?sslmode=require
 */

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
