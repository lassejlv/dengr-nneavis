import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'
import ky from '@/lib/ky'
import toast from 'react-hot-toast'
import { Label } from '@/components/ui/label'

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

  const LoginMutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
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
    LoginMutation.mutate(data)
  }

  return (
    <>
      <form className='flex flex-col items-center justify-center h-screen' onSubmit={submit}>
        <h2 className='text-2xl mb-4'>Velkommen tilbage</h2>
        <div className='grid grid-cols-1 gap-4 max-w-md'>
          {fields.map((field) => (
            <div key={field.name} className='mb-3'>
              <Label htmlFor={field.name} className='block mb-1'>
                {field.label}
              </Label>
              <Input key={field.name} id={field.name} type={field.type} name={field.name} placeholder={field.placeholder} className='w-full p-2 e rounded' />
            </div>
          ))}

          <div className='mt-2'>
            <p className='text-sm text-gray-600'>
              Har du ikke en konto?{' '}
              <Link to='/register' className='text-blue-500 hover:underline'>
                Opret en her
              </Link>
            </p>
          </div>
        </div>

        <Button variant='darkGreen' type='submit' disabled={LoginMutation.isPending} className='bg-green-600 text-white px-4 py-2 rounded'>
          {LoginMutation.isPending ? <Spinner /> : 'Login'}
        </Button>
      </form>
    </>
  )
}
