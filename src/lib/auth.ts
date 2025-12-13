import {betterAuth} from "better-auth"
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import {db} from "@/db/db-connection.ts";
import * as schema from "@/db/schema/auth-schema";

export const auth = betterAuth({
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