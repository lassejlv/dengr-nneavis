import DonationSection from '@/components/DonationSection'
import { Separator } from '@/components/ui/separator'
import { GetCategories, GetProducts } from '@/lib/api'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => {
    const categories = await GetCategories()
    const products = await GetProducts()

    return { categories, products }
  },
})

function RouteComponent() {
  const { categories, products } = Route.useLoaderData()
  console.log(products)

  return (
    <div className='bg-neutral-100 flex flex-row justify-center w-full'>
      {/* Main content */}
      <main className='w-[984px] mx-auto mt-[104px]'>
        <section className='mb-14'>
          <Separator className='w-[980px] h-1 bg-[#1d8438]' />
          <h2 className='font-normal text-[#1e1e1e] text-xl my-4'>Udvalgte Produkter</h2>
          <div className='grid grid-cols-[repeat(auto-fit,minmax(148px,1fr))]'>
            {products.slice(0, 6).map((product) => (
              <Link key={product.id} to='/products/view/$slug' params={{ slug: product.slug }}>
                <div className='relative'>
                  <img className='w-[148px] h-[148px] object-cover' alt={product.image} src={product.image} />
                  {product.name && (
                    <div className='absolute bottom-0 w-[148px] h-[41px] bg-[#00a676bf] flex items-center justify-center'>
                      <span className='font-normal text-white text-sm text-center'>{product.name}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Banner Section */}
        <section className='mb-14'>
          <Separator className='w-[980px] h-1 bg-[#1d8438]' />
          <div className='relative w-[980px] h-60 mt-8 bg-[url(/homepage_image.png)] bg-cover'>
            <div className='absolute w-full h-full bg-[#2b2b2b73] flex flex-col items-center justify-center'>
              <h2 className='text-shadow-md font-normal text-white text-4xl mb-8'>Den Grønne Avis</h2>
              <p className='text-shadow-md font-normal text-white text-xl text-center max-w-[511px]'>
                Vi går forest i kampen om klimaet ved at give 2 kr. til klima-venlige formål, hver gang du handler brugt på Den Grønne Avis
              </p>
            </div>
          </div>
        </section>

        {/* Popular Categories Section */}
        <section className='mb-14'>
          <Separator className='w-[980px] h-1 bg-[#1d8438]' />
          <h2 className='font-normal text-[#1e1e1e] text-xl my-4'>Populære Kategorier</h2>
          <div className='grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]'>
            {categories.slice(0, 6).map((category) => (
              <div key={category.id} className='relative w-[150px] h-[150px]'>
                <div className='w-full h-full bg-cover bg-center' style={{ backgroundImage: `url(${category.category_image})` }} />
                <div className='absolute top-0 w-full h-[30px] bg-[#00a676] flex items-center justify-center'>
                  <a className='font-normal text-neutral-100 text-[15px] text-center underline'>{category.name}</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <DonationSection />
      </main>
    </div>
  )
}
