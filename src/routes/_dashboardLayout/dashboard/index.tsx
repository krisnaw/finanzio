import {createFileRoute} from '@tanstack/react-router'
import {useSuspenseQuery} from "@tanstack/react-query";
import {getTransactions} from "@/serverActions/transactionActions.ts";

export const Route = createFileRoute('/_dashboardLayout/dashboard/')({
  component: RouteComponent,
})


function RouteComponent() {
  const { data }  = useSuspenseQuery({
    queryKey: ['getTransactions'],
    queryFn: () => getTransactions()
  })

  console.log(data)
  return (
    <div>
      {data?.length >= 1 && data.map((item) => <div>{item.id}</div>)}
    </div>
  )
}
