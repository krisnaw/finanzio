import {createInsertSchema} from "drizzle-zod";
import {user} from "@/db/schema/auth-schema.ts";

export const userInsertSchema = createInsertSchema(user);