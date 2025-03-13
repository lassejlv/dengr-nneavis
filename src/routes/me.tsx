import { createFileRoute, redirect } from '@tanstack/react-router'
import { User } from './login'
import ky from '@/lib/ky'

export const Route = createFileRoute('/me')({
  component: RouteComponent,
  loader: async () => {
    const session = localStorage.getItem('session')
    const json = JSON.parse(session || '{}') as { access_token: string; user: User }

    if (!json.access_token) throw new Error('Not logged in')

    const response = await ky.get('users', {
      headers: {
        Authorization: `Bearer ${json.access_token}`,
      },
    })

    return response.json<{ data: User & { products: any[] } }>()
  },
  onError: (error) => {
    console.error(error)
    throw redirect({ to: '/login' })
  },
})

function RouteComponent() {
  const { data } = Route.useLoaderData()

  return <div className='text-3xl'>Hej med dig {data.firstname}</div>
}
