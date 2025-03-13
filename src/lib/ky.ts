import kyPkg from 'ky'
import { API_URL } from './api'

const ky = kyPkg.create({
  prefixUrl: API_URL,
  retry: 0,
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          const json = (await response.json()) as { message: string }
          throw new Error(json.message || 'An unknown error occurred')
        }
      },
    ],
  },
})

export default ky
