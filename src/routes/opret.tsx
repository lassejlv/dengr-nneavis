import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import useCategories from '@/hooks/useCategories'
import { Product } from '@/lib/api'
import { GetToken, HandleAuth } from '@/lib/auth'
import ky from '@/lib/ky'
import { InputField } from '@/types/InputField'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import toast from 'react-hot-toast'
import { z } from 'zod'

const NewProductSchema = z.object({
  title: z.string().max(50),
  category: z.string().max(50),
  product_text: z.string().max(500),
  url: z.string().max(500),
  price: z.string(),
})

export type NewProductSchema = z.infer<typeof NewProductSchema>

export const Route = createFileRoute('/opret')({
  component: RouteComponent,
  loader: async () => {
    const data = await HandleAuth()
    if (!data) throw new Error('Not logged in')
    return { data }
  },
  onError: () => {
    throw redirect({ to: '/login' })
  },
})

const fields: InputField[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
  },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    required: true,
    jsx: function SelectCategory() {
      const categories = useCategories()

      if (categories.isLoading) {
        return <div>Loading...</div>
      }

      if (categories.isError) {
        return <div>Error...</div>
      }

      if (!categories.data) {
        return <div>No data...</div>
      }

      return (
        <Select name='category'>
          <SelectTrigger>
            <SelectValue placeholder='Select category' />
          </SelectTrigger>
          <SelectContent>
            {categories.data.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
  },
  {
    name: 'product_text',
    label: 'Product text',
    type: 'text',
    jsx: function ProductText() {
      return (
        <>
          <Textarea name='product_text' id='product_text' required />
        </>
      )
    },
  },
  {
    name: 'url',
    label: 'URL til billede',
    type: 'text',
    required: true,
  },
  {
    name: 'price',
    label: 'Price',
    type: 'number',
    required: true,
  },
]

function RouteComponent() {
  const navigate = Route.useNavigate()

  const NewProductMutation = useMutation({
    mutationFn: async (data: NewProductSchema) => {
      const { data: productData, success } = await NewProductSchema.safeParseAsync(data)
      if (!success) throw new Error('Invalid data')

      const token = GetToken()

      return await ky
        .post(`products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: new URLSearchParams({
            name: productData.title,
            category_id: productData.category,
            description: productData.product_text,
            image: productData.url,
            price: productData.price,
          }),
        })
        .json<{ data: Product }>()
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success('Product created!')
      navigate({ to: '/products/view/$slug', params: { slug: data.data.slug } })
    },
    onError: (error) => {
      console.error(error)
      toast.error(error.message || 'Something went wrong')
    },
  })

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: NewProductSchema = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      product_text: formData.get('product_text') as string,
      url: formData.get('url') as string,
      price: formData.get('price') as string,
    }

    NewProductMutation.mutate(data)
  }

  return (
    <form className='flex flex-col items-center justify-center h-screen' onSubmit={submit}>
      <h2 className='text-2xl mb-4'>Opret en Annoce</h2>
      <div className='grid grid-cols-1 gap-4 max-w-md'>
        {fields.map((field) => (
          <div key={field.name} className='mb-3'>
            <Label htmlFor={field.name} className='block mb-1'>
              {field.label}
            </Label>

            {field.jsx ? (
              field.jsx()
            ) : (
              <Input key={field.name} id={field.name} type={field.type} name={field.name} placeholder={field.placeholder} className='w-full p-2 e rounded' />
            )}
          </div>
        ))}
      </div>

      <Button variant='darkGreen' type='submit' className='bg-green-600 text-white px-4 py-2 rounded' disabled={NewProductMutation.isPending}>
        {NewProductMutation.isPending ? <Spinner /> : 'Opret Annonce'}
      </Button>
    </form>
  )
}
