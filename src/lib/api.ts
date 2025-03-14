import { User } from '@/routes/login'
import ky from './ky'

export const API_URL = import.meta.env.VITE_API_URL

export interface Category {
  id: number
  name: string
  category_image: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: number
  name: string
  image: string
  slug: string
  description: string
  price: number
  category_id: number
  createdAt: string
  updatedAt: string
}

interface Comment {
  id: number
  comment: string
  user: User
  createdAt: string
  updatedAt: string
}

export const GetCategories = async (): Promise<Category[]> => {
  const res = await ky.get(`categories`).json<{ data: Category[] }>()
  return res.data
}

export const GetProductsByCategory = async (slug: string): Promise<Product[]> => {
  const res = await ky.get(`products/category/${slug}`).json<{ data: Product[] }>()
  return res.data
}

export const GetProducts = async (): Promise<Product[]> => {
  const res = await ky.get(`products`).json<{ data: Product[] }>()
  return res.data
}

export const GetProductBySlug = async (slug: string): Promise<Product> => {
  const res = await ky.get(`products/${slug}`).json<{ data: Product }>()
  return res.data
}

export const GetProductCommentsById = async (id: string): Promise<Comment[]> => {
  const res = await ky.get(`comment/${id}`).json<{ data: Comment[] }>()
  return res.data
}
