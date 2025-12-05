import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/webhook/incoming')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response(', World! from incoming ' + request.url)
      },
      POST: async ({ request }) => {

        const event = await request.json();


        console.log(event.type)
        console.log("this is post webhook")


        return new Response('post. Hello, World! from incoming ' + request.url)
      },
    },
  },
})