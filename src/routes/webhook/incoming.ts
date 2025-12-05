import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/webhook/incoming')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.log(request)
        return new Response('Hello, World! from incoming ' + request.url)
      },
    },
  },
})