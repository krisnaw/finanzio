import {createFileRoute} from '@tanstack/react-router'
import {getTransactions} from "@/serverActions/transactionActions.ts";

export const Route = createFileRoute('/_dashboardLayout/dashboard/')({
  loader: async () => {
    return await getTransactions()
  },
  component: RouteComponent,
})


function RouteComponent() {
  const posts = Route.useLoaderData()
  console.log(posts)
  return <div>Hello "/dashboard/"!</div>
}
