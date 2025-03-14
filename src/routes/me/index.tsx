import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { Product } from '@/lib/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GetToken, HandleAuth } from '@/lib/auth'
import { InputField } from '@/types/InputField'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { User } from '../login'
import ky from '@/lib/ky'

export const Route = createFileRoute('/me/')({
  component: RouteComponent,
  loader: async () => {
    const data = await HandleAuth()
    if (!data) throw new Error('Not logged in')
    return { data }
  },
  onError: (error) => {
    console.error(error)
    throw redirect({ to: '/login' })
  },
})

const fields: InputField[] = [
  {
    name: 'firstname',
    label: 'Fornavn',
    type: 'text',
    placeholder: 'Dit fornavn',
    required: true,
  },
  {
    name: 'lastname',
    label: 'Efternavn',
    type: 'text',
    placeholder: 'Dit efternavn',
    required: true,
  },
  {
    name: 'address',
    label: 'Adresse',
    type: 'text',
    placeholder: 'Din adresse',
    required: true,
  },
  {
    name: 'zipcode',
    label: 'Postnummer',
    type: 'text',
    placeholder: 'Dit postnummer',
    required: true,
  },
  {
    name: 'city',
    label: 'By',
    type: 'text',
    placeholder: 'Din by',
    required: true,
  },
]

function RouteComponent() {
  const { data } = Route.useLoaderData()

  console.log(data.data.firstname)

  return (
    <div className='flex flex-col items-center justify-center'>
      <Tabs defaultValue='my-profile' className='w-[400px]'>
        <TabsList>
          <TabsTrigger value='my-profile'>Min Profil</TabsTrigger>
          <TabsTrigger value='my-products'>Mine Annoncer</TabsTrigger>
        </TabsList>

        <TabsContent value='my-profile'>
          <MyProfile data={data.data} />
        </TabsContent>

        <TabsContent value='my-products'>
          <MyProducts products={data.data.products} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MyProfile({ data }: { data: User }) {
  const router = useRouter()
  return (
    <div>
      <h1>Min Profil</h1>

      <form>
        {fields.map((field) => (
          <Input
            key={field.name}
            {...field}
            defaultValue={
              field.name === 'firstname'
                ? data.firstname
                : field.name === 'lastname'
                  ? data.lastname
                  : field.name === 'address'
                    ? data.address
                    : field.name === 'zipcode'
                      ? data.zipcode
                      : field.name === 'city'
                        ? data.city
                        : ''
            }
          />
        ))}
      </form>

      <footer>
        <Button
          variant='destructive'
          onClick={() => {
            router.invalidate()
            localStorage.clear()
            toast.success('Logget ud!')
          }}
        >
          Log ud
        </Button>
        <Button
          variant='destructive'
          onClick={async () => {
            const confirm = window.confirm('Er du sikker?')
            if (confirm) {
              const promise = new Promise(async (res, rej) => {
                try {
                  const token = GetToken()
                  if (!token) throw new Error('Not logged in')

                  await ky.delete(`users`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  toast.success('Konto slettet')
                  localStorage.clear()
                  router.invalidate()
                  res(true)
                } catch (error) {
                  rej(error)
                }
              })

              toast.promise(promise, {
                loading: 'Sletter konto',
                success: 'Konto slettet',
                error: 'Noget gik galt',
              })
            }
          }}
        >
          Slet konto
        </Button>
      </footer>
    </div>
  )
}

function MyProducts({ products }: { products: Product[] }) {
  return (
    <div>
      <h1 className='text-2xl'>Mine Annoncer</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <Link to='/products/view/$slug' params={{ slug: product.slug }}>
              Gå til annoncen
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
