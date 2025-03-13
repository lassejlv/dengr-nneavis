import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='bottom-center' />
      <Navbar />
      <Outlet />
      <Footer />
    </QueryClientProvider>
  )
}
