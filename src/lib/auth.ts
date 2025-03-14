import { User } from '@/routes/login'
import { Product } from './api'
import ky from './ky'

export function GetToken(): string | null {
  const token = localStorage.getItem('session')
  if (!token) return null
  const tokenParsed = JSON.parse(token) as { access_token: string }

  return tokenParsed.access_token
}

export type UserResponseWithProducts = { data: User & { products: Product[] } }

export async function HandleAuth(): Promise<UserResponseWithProducts | null> {
  const session = localStorage.getItem('session')
  const session_json = JSON.parse(session || '{}') as { access_token: string }

  if (!session_json.access_token) return null

  const response = await ky.get('users', {
    headers: {
      Authorization: `Bearer ${session_json.access_token}`,
    },
  })

  return response.json<UserResponseWithProducts>()
}
