import { MailWarning, Info, User } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { GetCategories } from '@/lib/api'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

function NavbarLogo() {
  const navigate = useNavigate()

  return (
    <div className='flex items-center select-none cursor-pointer' onClick={() => navigate({ to: '/' })}>
      <div className='bg-dark-green text-white px-4 py-2 flex items-center'>Den Grønne</div>
      <div className='bg-white text-dark-green px-4 py-[7px] flex items-center border border-dark-green'>Avis</div>
    </div>
  )
}

export default function Navbar() {
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await GetCategories()
      return res
    },
  })

  return (
    <>
      <nav className='shadow-md fixed top-0 left-0 right-0 bg-white'>
        <div className='container mx-auto flex items-center justify-between p-2'>
          <NavbarLogo />

          <div className='flex items-center space-x-4'>
            {categories.data && !categories.isLoading && !categories.isError && (
              <div className='relative mx-2'>
                <Select>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Vælg kategori' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.data.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button variant='lightGreen'>opret annonce</Button>

            <div className='flex space-x-6 ml-4'>
              <button>
                <MailWarning size={20} />
              </button>
              <button>
                <Info size={20} />
              </button>
              <button>
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
