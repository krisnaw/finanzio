import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {createServerFn} from "@tanstack/react-start";
import {auth} from "@/lib/auth.ts";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {Spinner} from "@/components/ui/spinner.tsx";

export const Route = createFileRoute('/_authLayout/auth/register')({
  component: RouteComponent,
})

export const registerFn = createServerFn({method: "POST"})
  .inputValidator((data: { name: string, email: string, password: string }) => data)
  .handler(async ({data}) => {
    const result = await auth.api.signUpEmail({
      body: {
        name: data.name, // required
        email: data.email, // required
        password: data.password, // required
      },
    });

    return {
      success: true,
      data: result
    }
  })

function RouteComponent() {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {

      const result = await registerFn({
        data: {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          password: formData.get('password') as string
        }
      })

      return result.data
    },
    onSuccess: (data) => {
      console.log('Success:', data)
      toast.success('Registration successful')
      navigate({ to: '/dashboard'})
    },
    onError: (error) => {
      console.error('Error:', error)
      toast.error('Registration failed')
    }
  })

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
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
                <Button type="submit"  disabled={mutation.isPending}>
                  {mutation.isPending ? <Spinner /> : null}
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
