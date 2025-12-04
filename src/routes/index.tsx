import {createFileRoute} from '@tanstack/react-router'
import {Button} from "@/components/ui/button.tsx";

export const Route = createFileRoute('/')({ component: App })

function App() {

  return (
    <div>
      Hello world
      <Button> This is button </Button>
    </div>
  )
}
