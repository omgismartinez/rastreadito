import Link from 'next/link'
import { Scan } from 'lucide-react'

export default function Navbar() {
    return (
        <nav className='flex justify-between items-center py-6 relative'>
            <h1 className='font-black text-2xl uppercase italic'>rastreadito</h1>
            <div className='flex gap-2'>
                <Link href={'/scan'} className='rounded-full'>
                    <div className='w-11 h-11 border-2 border-_gray dark:border-_darkText rounded-full flex items-center justify-center'>
                        <Scan />
                    </div>
                </Link>
                <Link href={'/account'} className='rounded-full'>
                    <div className='w-11 h-11 border-2 border-_gray dark:border-_darkText bg-_primary rounded-full' />
                </Link>
            </div>
        </nav>
    )
}