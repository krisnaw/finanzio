import {createFileRoute} from '@tanstack/react-router'
import {createServerFn} from "@tanstack/react-start";
import {db} from "@/db/db-connection.ts";
import {transactionSchema} from "@/db/schema/transaction-schema.ts";

const getTransactions = createServerFn({ method: 'GET'})
  .handler(async () => {
    return db.select().from(transactionSchema);
  })

export const Route = createFileRoute('/_dashboardLayout/dashboard/')({
  component: RouteComponent,
  ssr: true,
  beforeLoad: () => {
    console.log('Executes on the server during the initial request')
    console.log('Executes on the client for subsequent navigation')
  },
  loader: async () => await getTransactions(),
})

function RouteComponent() {
  // const { data }  = useSuspenseQuery({
  //   queryKey: ['transactions'],
  //   queryFn: () => getTransactions()
  // })
  //
  // console.log(data)

  let transactions = Route.useLoaderData()
  console.log(transactions)
  return (
    <div>
      Dashboard
      {/*{data?.length >= 1 && data.map((item) => <div>{item.id}</div>)}*/}
    </div>
  )
}
