import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import ky from '@/lib/ky'
import toast from 'react-hot-toast'

export interface User {
  id: string
  firstname: string
  lastname: string
}

const LoginSchema = z.object({
  email: z.string().email().max(50),
  password: z.string().min(6).max(20),
})

export type LoginSchema = z.infer<typeof LoginSchema>

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

const fields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Din email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Din password',
  },
]

function RouteComponent() {
  const navigate = Route.useNavigate()

  const RegisterMutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      // body is url encoded
      const { data: userData, success } = await LoginSchema.safeParseAsync(data)
      if (!success) throw new Error('Invalid data')

      return await ky
        .post(`login`, {
          body: new URLSearchParams({
            username: userData.email,
            password: userData.password,
          }),
        })
        .json<{ data: { access_token: string; user: User } }>()
    },
    onSuccess: (data) => {
      localStorage.setItem('session', JSON.stringify({ access_token: data.data.access_token, user: data.data.user }))
      toast.success('Velkommen tilbage!')
      navigate({ to: '/me' })
    },
    onError: (error) => {
      console.error(error)
      toast.error(error.message || 'Noget gik galt')
    },
  })

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData) as LoginSchema
    console.log(data)
    RegisterMutation.mutate(data)
  }

  return (
    <>
      <form className='flex flex-col items-center justify-center h-screen' onSubmit={submit}>
        <div className='grid grid-cols-1 gap-6'>
          {fields.map((field) => (
            <Input key={field.name} type={field.type} name={field.name} placeholder={field.placeholder} />
          ))}
        </div>

        <Button variant='darkGreen' type='submit' disabled={RegisterMutation.isPending}>
          {RegisterMutation.isPending ? <Spinner /> : 'Login'}
        </Button>
      </form>
    </>
  )
}
