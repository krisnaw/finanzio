import {createFileRoute} from '@tanstack/react-router'
import {Resend} from "resend";
import {parseBcaTransactionEmail} from "@/lib/parser.ts";
import {db} from "@/db/db-connection.ts";
import {transactionSchema} from "@/db/schema/transaction-schema.ts";

const resend = new Resend(process.env.RESEND_API_KEY);

export const Route = createFileRoute('/webhook/incoming')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response(', World! from incoming ' + request.url)
      },
      POST: async ({ request }) => {

        const event = await request.json();

        if (event.type === 'email.received') {
          const { data: email } = await resend
            .emails
            .receiving
            .get(event.data.email_id);


          if(email?.text) {
            const parsed = parseBcaTransactionEmail(email?.text)
            const amount = parsed.totalPayment?.amount;
            await db.insert(transactionSchema).values({
              acquirer: parsed.acquirer ?? 'BCA',
              currency: parsed.totalPayment?.currency ?? 'IDR',
              amount: (amount && !isNaN(amount)) ? amount.toString() : '0',
            })
          }


          return new Response(email?.text)
        }

        console.log(event.type)
        console.log("this is post webhook")


        return new Response('post. Hello, World! from incoming ' + request.url)
      },
    },
  },
})