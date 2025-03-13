import { GetCategories } from '@/lib/api'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => {
    const categories = await GetCategories()

    return { categories }
  },
})

function RouteComponent() {
  const { categories } = Route.useLoaderData()

  return <></>
}
