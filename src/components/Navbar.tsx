// interface NavbarItem {}

import { MailWarning, Info, User } from 'lucide-react'
import { Button } from './ui/button'

function NavbarLogo() {
  return (
    <div className='flex items-center'>
      <div className='bg-dark-green text-white px-4 py-2 flex items-center'>Den Grønne</div>
      <div className='bg-white text-dark-green px-4 py-2 flex items-center border border-dark-green'>Avis</div>
    </div>
  )
}

export default function Navbar() {
  return (
    <>
      <div className=' h-8' />
      <nav className='bg-white shadow-md'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-16'>
            <NavbarLogo />

            {/* Search Bar */}
            <div className='flex-1 max-w-xs mx-8'>
              <div className='relative'>
                <select className='w-full px-4 py-1.5 rounded border border-gray-300 focus:outline-none focus:border-dark-green text-sm appearance-none bg-white'>
                  <option>vælg kategori</option>
                </select>
                <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                  <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                  </svg>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button variant='darkGreen' onClick={() => alert('opret annonce')}>
              opret annonce
            </Button>

            {/* Navigation Icons */}
            <div className='flex items-center space-x-6 ml-6'>
              <button className='text-gray-600 hover:text-dark-green transition-colors'>
                <MailWarning className='h-5 w-5' />
              </button>
              <button className='text-gray-600 hover:text-dark-green transition-colors'>
                <Info className='h-5 w-5' />
              </button>
              <button className='text-gray-600 hover:text-dark-green transition-colors'>
                <User className='h-5 w-5' />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
