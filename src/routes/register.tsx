import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import ky from '@/lib/ky'
import toast from 'react-hot-toast'

const RegisterSchema = z.object({
  email: z.string().email().max(50),
  password: z.string().min(6).max(20),
  firstname: z.string().max(50),
  lastname: z.string().max(50),
  address: z.string().max(50),
  zipcode: z.string().max(50),
  city: z.string().max(50),
})

export type RegisterSchema = z.infer<typeof RegisterSchema>

export const Route = createFileRoute('/register')({
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
  {
    name: 'firstname',
    label: 'Fornavn',
    type: 'text',
    placeholder: 'Dit fornavn',
  },
  {
    name: 'lastname',
    label: 'Efternavn',
    type: 'text',
    placeholder: 'Dit efternavn',
  },
  {
    name: 'address',
    label: 'Adresse',
    type: 'text',
    placeholder: 'Din adresse',
  },
  {
    name: 'zipcode',
    label: 'Postnummer',
    type: 'text',
    placeholder: 'Dit postnummer',
  },
  {
    name: 'city',
    label: 'By',
    type: 'text',
    placeholder: 'Din by',
  },
]

function RouteComponent() {
  const navigate = Route.useNavigate()

  const RegisterMutation = useMutation({
    mutationFn: async (data: RegisterSchema) => {
      // body is url encoded
      const { data: userData, success } = await RegisterSchema.safeParseAsync(data)
      if (!success) throw new Error('Invalid data')

      return await ky.post(`users`, {
        body: new URLSearchParams({
          email: userData.email,
          password: userData.password,
          firstname: userData.firstname,
          lastname: userData.lastname,
          address: userData.address,
          zipcode: userData.zipcode,
          city: userData.city,
        }),
      })
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success('Din konto er nu oprettet!')
      navigate({ to: '/login' })
    },
    onError: (error) => {
      console.error(error)
      toast.error(error.message || 'Noget gik galt')
    },
  })

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData) as RegisterSchema
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
          {RegisterMutation.isPending ? <Spinner /> : 'Opret'}
        </Button>
      </form>
    </>
  )
}
