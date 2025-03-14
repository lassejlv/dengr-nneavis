import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { Product } from '@/lib/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HandleAuth } from '@/lib/auth'

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
          <MyProfile />
        </TabsContent>

        <TabsContent value='my-products'>
          <MyProducts products={data.data.products} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MyProfile() {
  return (
    <div>
      <h1>My Profile</h1>
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
