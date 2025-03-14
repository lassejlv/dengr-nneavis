import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl'>404</h1>
      <p className='text-2xl'>
        Siden blev ikke fundet desværre. Gå til{' '}
        <Link to='/' className='hover:underline text-dark-green'>
          forsiden
        </Link>
      </p>
    </div>
  )
}
