import {betterAuth} from "better-auth"
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import {db} from "@/db/db-connection.ts";
import * as schema from "@/db/schema/auth-schema";
import {tanstackStartCookies} from "better-auth/tanstack-start";

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:8080",
    "https://finanzio-production.up.railway.app"
  ],
  plugins: [
    tanstackStartCookies()
  ],
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
    schema: {
      ...schema
    }
  }),
  emailAndPassword: {
    enabled: true
  }
})