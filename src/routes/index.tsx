import {createFileRoute, Link} from '@tanstack/react-router'
import {Button} from "@/components/ui/button.tsx";

export const Route = createFileRoute('/')({ component: App })

function App() {

  return (
    <div>
      <Button asChild>
        <Link to={'/dashboard'}>
          Dashboard
        </Link>
      </Button>
    </div>
  )
}
