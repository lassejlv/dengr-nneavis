import useSession from '@/hooks/useSession'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/me')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const session = useSession()

  if (session.isLoading) return <div>Loading...</div>
  if (!session.data || session.isError) return navigate({ to: '/login' })

  return <div>Hej med dig {session.data.data.firstname}</div>
}
