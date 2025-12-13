import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {toast} from "sonner";
import {Spinner} from "@/components/ui/spinner.tsx";
import {authClient} from "@/lib/auth-client.ts";
import {useState} from "react";

export const Route = createFileRoute('/_authLayout/auth/register')({
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
    const name = formData.get('name') as string;

    await authClient.signUp.email({
      name,
      email,
      password
    }, {
      onRequest: () => {
        //show loading
        setIsPending(true);
      },
      onSuccess: () => {
        //redirect to the dashboard or sign in page
        toast.success('Sign up successful')
        setIsPending(false);
        navigate({to: '/dashboard'})
      },
      onError: (ctx) => {
        // display the error message
        toast.error(ctx.error.message);
      },
    });

  }


  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Register to your account</CardTitle>
          <CardDescription>
            Enter your name, email, and password below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" name="name" placeholder="John Doe" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" required/>
              </Field>
              <Field>
                <Button type="submit"  disabled={isPending}>
                  {isPending ? <Spinner /> : null}
                  Register
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/auth/login" >Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
