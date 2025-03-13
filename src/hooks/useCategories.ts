import { GetCategories } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export default function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await GetCategories()
      return res
    },
  })
}
