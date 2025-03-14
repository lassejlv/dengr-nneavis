import { GetCategories, GetProductBySlug } from '@/lib/api'
import { createFileRoute, notFound, useRouter } from '@tanstack/react-router'
import { GetProductCommentsById } from '@/lib/api'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { GetToken, HandleAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import Spinner from '@/components/Spinner'
import toast from 'react-hot-toast'
import ky from '@/lib/ky'

export const Route = createFileRoute('/products/view/$slug')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const session = await HandleAuth()
    const product = await GetProductBySlug(params.slug)
    const categories = await GetCategories()

    if (!session) throw new Error('Not logged in')
    if (!product) throw new Error('Product not found')

    const comments = await GetProductCommentsById(product.id.toString())

    return { product, comments, categories, session }
  },
  onError: () => {
    throw notFound()
  },
})

function RouteComponent() {
  const { product, comments, categories, session } = Route.useLoaderData()
  const router = useRouter()

  const addCommentMutation = useMutation({
    mutationFn: async (data: { comment: string }) => {
      const { data: commentData, success } = await z.object({ comment: z.string().min(1) }).safeParseAsync(data)
      if (!success) throw new Error('Invalid data')

      const token = GetToken()
      if (!token) throw new Error('Not logged in')

      return await ky.post(`comment/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: new URLSearchParams({
          comment: commentData.comment,
        }),
      })
    },
    onSuccess: () => {
      toast.success('Kommentar tilføjet!')
      router.invalidate()
    },
    onError: (error) => {
      console.error(error)
      toast.error(error.message || 'Noget gik galt')
    },
  })

  const deleteCommentMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = GetToken()
      if (!token) throw new Error('Not logged in')

      return await ky.delete(`comment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      toast.success('Kommentar slettet!')
      router.invalidate()
    },
    onError: (error) => {
      console.error(error)
      toast.error(error.message || 'Noget gik galt')
    },
  })

  const addCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const comment = formData.get('comment') as string
    addCommentMutation.mutate({ comment })
  }

  return (
    <div className='bg-neutral-100 flex flex-row justify-center w-full'>
      <div className='bg-neutral-100 overflow-hidden w-[1280px] relative'>
        <main className='px-[55px] pt-[228px]'>
          {/* Green separator */}
          <Separator className='w-[978px] h-1 mx-auto bg-[#1d8438]' />

          <div className='mt-[53px]'>
            <h2 className='text-xl font-normal mb-[11px]'>Alle kategorier</h2>

            <div className='flex'>
              {/* Categories sidebar */}
              <div className='w-[153px] flex flex-col items-start gap-1'>
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`relative self-stretch [font-family:'Roboto',Helvetica] text-sm leading-[18px] ${
                      category.id === product.category_id ? 'font-bold text-[#181818]' : 'font-light text-black'
                    }`}
                  >
                    {category.name}
                  </div>
                ))}
              </div>

              {/* Product details */}
              <div className='ml-[141px]'>
                <img className='w-[545px] h-[406px] object-cover' alt={product.name} src={product.image} />

                <h1 className='mt-5 text-4xl font-normal'>{product.name}</h1>

                <p className='mt-3 text-sm font-light w-[545px]'>
                  {product.description}
                  <br />
                  <br />
                  <br />
                </p>

                <p className='mt-4 text-xl font-medium text-[#1e1e1e]'>Pris: {product.price} kr</p>

                <Separator className='w-[978px] h-1 mt-[70px] bg-[#1d8438]' />

                <h2 className='mt-[67px] text-[32px] font-normal text-[#1d8438] text-center'>Kontakt sælger</h2>

                <form onSubmit={addCommentSubmit}>
                  <Card className='border-2 border-solid border-[#1d843880] rounded-none bg-neutral-100'>
                    <CardContent className='p-4'>
                      <Textarea name='comment' className='!border-none bg-transparent font-light text-sm outline-none' placeholder='Skriv en besked til sælger.....' />
                    </CardContent>
                  </Card>

                  <div className='flex justify-end mt-[18px]'>
                    <Button type='submit' className='w-[82px] h-7 bg-[#1d8438] rounded-none' disabled={addCommentMutation.isPending}>
                      {addCommentMutation.isPending ? <Spinner /> : <span className='font-normal text-base'>send</span>}
                    </Button>
                  </div>
                </form>

                {comments.length < 1 ? (
                  <p className='mt-4 text-xl font-medium text-[#1e1e1e] text-center'>Ingen kommentarer endnu</p>
                ) : (
                  <>
                    <div className='mt-[28px]'>
                      {comments.map((message, index) => (
                        <div key={index} className={`mt-5 ${session.data.id !== message.user.id ? 'flex justify-start' : 'flex justify-end'}`}>
                          <div>
                            <p className='text-xs font-extralight mb-1'>{message.user.firstname}</p>
                            <Card className={`border-2 border-solid border-[#1d843880] rounded-none bg-[#f7f9f9] ${index === 0 ? 'w-[276px]' : 'w-[306px]'}`}>
                              <CardContent className='p-2'>
                                <p className='font-light text-sm'>{message.comment}</p>
                              </CardContent>
                            </Card>
                            {session.data.id === message.user.id && (
                              <p
                                className='text-right text-[10px] font-light text-[#942d0d] mt-1 cursor-pointer hover:underline'
                                onClick={() => {
                                  const confirm = window.confirm('Er du sikker på at du vil slette kommentaren?')
                                  if (confirm) {
                                    deleteCommentMutation.mutate(message.id)
                                  }
                                }}
                              >
                                slet kommentar
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
