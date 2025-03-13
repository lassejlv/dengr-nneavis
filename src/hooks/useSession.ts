import ky from '@/lib/ky'
import { User } from '@/routes/login'
import { useQuery } from '@tanstack/react-query'

export default function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const session = localStorage.getItem('session')
      const json = JSON.parse(session || '{}') as { access_token: string; user: User }

      if (!json.access_token) return null

      return await ky
        .get('users', {
          headers: {
            Authorization: `Bearer ${json.access_token})}`,
          },
        })
        .json<{ data: User & { products: any[] } }>()
    },
  })
}
