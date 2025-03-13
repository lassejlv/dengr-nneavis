import kyPkg from 'ky'

const ky = kyPkg.create({
  prefixUrl: import.meta.env.VITE_API_URL,

  retry: 3,
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
