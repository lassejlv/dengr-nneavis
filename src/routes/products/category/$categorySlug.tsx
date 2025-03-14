import { GetCategories, GetProductsByCategory } from '@/lib/api'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

export const Route = createFileRoute('/products/category/$categorySlug')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const products = await GetProductsByCategory(params.categorySlug)
    const categories = await GetCategories()

    return { products, categories }
  },
})

function RouteComponent() {
  const { products, categories } = Route.useLoaderData()
  const params = Route.useParams()

  return (
    <div className='w-full max-w-[1102px] mx-auto mt-[228px]'>
      <div className='relative'>
        <Separator className='w-[978px] h-1 mx-auto bg-[#1d8438]' />

        <div className='flex mt-[53px] gap-8'>
          {/* Categories sidebar */}
          <div className='w-[447px]'>
            <div className='mb-4'>
              <h2 className='font-normal text-xl mb-4'>Alle kategorier</h2>
              <img className='w-52 h-52 ml-auto object-cover' alt='Alexander andrews' src='public/alexander-andrews-squrvit4b68-unsplash.png' />
            </div>

            <div className='ml-[15px] mt-[43px]'>
              <ul className='flex flex-col gap-1'>
                {categories.map((category, index) => (
                  <li key={index} className={`text-sm leading-[18px] font-light ${category.slug === params.categorySlug ? 'font-medium text-[#181818]' : 'text-black'}`}>
                    <Link to='/products/category/$categorySlug' params={{ categorySlug: category.slug }}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='mt-[50px]'>
              <img className='w-52 h-52 ml-auto object-cover' alt='Cesar abner martinez' src='public/cesar-abner-martinez-aguilar-lgqzg-e-rmw-unsplash.png' />
              <div className='w-52 ml-auto mt-4'>
                <p className='font-medium text-sm'>iPhone SE</p>
                <p className='font-light text-xs'>Her får du en billig iphone. God stand og kommer inkl...</p>
              </div>
            </div>

            <div className='mt-[50px]'>
              <img className='w-52 h-52 ml-auto object-cover' alt='Megan lee' src='public/megan-lee-jfkluzdvp9o-unsplash.png' />
              <div className='w-52 ml-auto mt-4'>
                <p className='font-medium text-sm'>Iphone SE (pink)</p>
                <p className='font-light text-xs'>Fed telefon der viker 100 procent. Kommer inkl. alt originalt...</p>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className='flex-1'>
            <div className='grid grid-cols-2 gap-6'>
              {products.map((product) => (
                <Card key={product.id} className='border-none shadow-none'>
                  <CardContent className='p-0'>
                    <img className='w-52 h-52 object-cover' alt={product.image} src={product.image || 'https://via.placeholder.com/150'} />
                    <div className='w-52 mt-4'>
                      <p className='font-medium text-sm'>{product.name}</p>
                      <p className='font-light text-xs'>{product.description}</p>
                      <div className='mt-4'>
                        <p className='font-medium text-sm'>Pris: {product.price} kr</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to='/products/view/$slug' params={{ slug: product.slug }}>
                      <Button>Se produkt</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
