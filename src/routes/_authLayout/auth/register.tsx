import {createFileRoute} from '@tanstack/react-router'
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";

export const Route = createFileRoute('/_authLayout/auth/register')({
  component: RouteComponent,
})

// const UserSchema = z.object({
//   email: z.string().min(1),
//   password: z.string().min(1)
// })

// const registerUser = createServerFn({method: 'POST'})
//   .inputValidator(UserSchema)
//   .handler(async ({data}) => {
//     console.log(data)
//     console.log('this is data')
//     return {success: true}
//   })

function RouteComponent() {
  //
  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget)
  //   const res = await registerUser({
  //     data: {
  //       email: formData.get('email')?.toString(),
  //       password: formData.get('password')?.toString()
  //     }
  //   })
  //   console.log(res)
  // }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Register to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
