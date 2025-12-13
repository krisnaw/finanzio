import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {cn} from "@/lib/utils.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {authClient} from "@/lib/auth-client.ts";
import {toast} from "sonner";
import {useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";

export const Route = createFileRoute('/_authLayout/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await authClient.signIn.email({
      /**
       * The user email
       */
      email,
      /**
       * The user password
       */
      password,
      /**
       * A URL to redirect to after the user verifies their email (optional)
       */
      callbackURL: "/dashboard",
      /**
       * remember the user session after the browser is closed.
       * @default true
       */
      rememberMe: false
    }, {
      onRequest: () => {
        //show loading
        setIsPending(true);
      },
      onSuccess: () => {
        //redirect to the dashboard or sign in page
        toast.success('Sign in successful')
        setIsPending(false);
        navigate({to: '/dashboard'})
      },
      onError: (ctx) => {
        // display the error message
        toast.error(ctx.error.message);
      },
    })



  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  tabIndex={2}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    tabIndex={4}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input tabIndex={3} id="password" name="password" type="password" required/>
              </Field>
              <Field>
                <Button type="submit" tabIndex={5}>
                  {isPending ? <Spinner /> : null}
                  Sign in
                </Button>
                <FieldDescription className="text-center">
                  Don't have an account? <a href="/auth/register" tabIndex={6}>Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
