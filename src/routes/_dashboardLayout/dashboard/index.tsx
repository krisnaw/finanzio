import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboardLayout/dashboard/')({
  component: RouteComponent,
  ssr: true,
  beforeLoad: () => {
    console.log('Executes on the server during the initial request')
    console.log('Executes on the client for subsequent navigation')
  },
  loader: () => {
    console.log('Executes on the server during the initial request')
    console.log('Executes on the client for subsequent navigation')
  },
})

function RouteComponent() {
  // const { data }  = useSuspenseQuery({
  //   queryKey: ['transactions'],
  //   queryFn: () => getTransactions()
  // })
  //
  // console.log(data)
  return (
    <div>
      Dashboard
      {/*{data?.length >= 1 && data.map((item) => <div>{item.id}</div>)}*/}
    </div>
  )
}
