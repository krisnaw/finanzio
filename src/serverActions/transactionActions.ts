import {createServerFn} from "@tanstack/react-start";
import {db} from "@/db/db-connection.ts";
import {transactionSchema} from "@/db/schema/transaction-schema.ts";

export const getTransactions = createServerFn({ method: 'GET'})
  .handler(async () => {
    return db.select().from(transactionSchema);
  })