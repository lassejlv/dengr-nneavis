import ky from './ky'

export const API_URL = import.meta.env.VITE_API_URL as string

export interface Category {
  id: number
  name: string
  category_image: string
  slug: string
  createdAt: string
  updatedAt: string
}

export const GetCategories = async (): Promise<Category[]> => {
  const res = await ky.get(`categories`).json<{ data: Category[] }>()
  return res.data
}
