import { MailWarning, Info, User, LogIn } from 'lucide-react'
import { Button } from './ui/button'
import { Link, useNavigate } from '@tanstack/react-router'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import useSession from '@/hooks/useSession'
import useCategories from '@/hooks/useCategories'

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
  const categories = useCategories()
  const session = useSession()
  const navigate = useNavigate()

  return (
    <>
      <nav className='shadow-md bg-white'>
        <div className='container mx-auto flex items-center justify-between p-2'>
          <NavbarLogo />

          <div className='flex items-center space-x-4'>
            {categories.data && !categories.isLoading && !categories.isError && (
              <div className='relative mx-2'>
                <Select onValueChange={(value) => navigate({ to: '/products/category/$categorySlug', params: { categorySlug: value } })}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Vælg kategori' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.data.map((category) => (
                      <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Link to='/opret'>
              <Button variant='lightGreen'>Opret annonce</Button>
            </Link>

            <div className='flex items-center space-x-6 ml-4'>
              <button>
                <MailWarning size={20} />
              </button>
              <button>
                <Info size={20} />
              </button>
              {session.data && !session.isLoading && !session.isError ? (
                <Link to='/me'>
                  <button>
                    <User size={20} />
                  </button>
                </Link>
              ) : (
                <Link to='/login'>
                  <button>
                    <LogIn size={20} />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
