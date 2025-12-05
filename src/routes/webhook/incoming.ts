import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/webhook/incoming')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.log(request)
        return new Response('Hello, World! from incoming ' + request.url)
      },
      POST: async ({ request }) => {

        const event = await request.json();


        console.log(event.type)


        return new Response('post. Hello, World! from incoming ' + request.url)
      },
    },
  },
})