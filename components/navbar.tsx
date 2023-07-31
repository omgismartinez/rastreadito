import Link from 'next/link'
import { Fingerprint, Scan } from 'lucide-react'
import { Button } from '@/ui/button'

interface NavbarProps {
    isAuth?: boolean
}

export default function Navbar({ isAuth = true }: NavbarProps) {
    return (
        <nav className='sticky top-0 z-50 bg-white/60 dark:bg-_dark/60 backdrop-blur-[8px]'>
            <div className='flex justify-between items-center py-6 relative px-4 max-w-7xl mx-auto'>
                <h1 className='font-black text-2xl uppercase italic'>rastreadito</h1>
                <div className='flex items-center gap-2'>
                    <Link href={'/scan'} className='rounded-full'>
                        <Button variant={'ghost'} size='sm' className='h-[44px] border-2 border-_gray dark:border-_darkText rounded-[50px]'>
                            <Scan className='dark:text-_white' />
                        </Button>
                    </Link>
                    <Link href={isAuth ? '/account' : '/auth'} className='rounded-full'>
                        {isAuth
                            ? <div className='w-11 h-11 border-2 border-_gray dark:border-_darkText bg-_primary rounded-full' />
                            : <Button size='sm' className='rounded-[50px] md:px-4 h-[44px] text-[14px] border-2 dark:border-_darkText whitespace-nowrap'>
                                <span className='hidden md:block'>Iniciar sesión</span>
                                <Fingerprint className='md:hidden' />
                            </Button>}
                    </Link>
                </div>
            </div>
        </nav>
    )
}
