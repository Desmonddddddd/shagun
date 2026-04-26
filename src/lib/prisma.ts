import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Use Turso hosted database if TURSO_DATABASE_URL is set (production/Vercel)
  // Otherwise fall back to local SQLite file (development)
  const url = process.env.TURSO_DATABASE_URL || `file:${path.join(process.cwd(), "prisma", "dev.db")}`;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  const adapter = new PrismaLibSql({
    url,
    ...(authToken ? { authToken } : {}),
  });

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
