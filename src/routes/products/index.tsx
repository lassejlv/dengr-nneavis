import { GetCategories, GetProducts } from '@/lib/api'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
  loader: async () => {
    const products = await GetProducts()
    const categories = await GetCategories()

    return { products, categories }
  },
})

function RouteComponent() {
  return <div>Hello "/products/"!</div>
}
