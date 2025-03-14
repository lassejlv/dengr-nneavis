import { GetProducts } from '@/lib/api'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
  loader: async () => {
    const products = await GetProducts()
    return { products }
  },
})

function RouteComponent() {
  return <div>Hello "/products/"!</div>
}
