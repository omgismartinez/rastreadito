'use client'

import { Back } from '@/components/ui/back'
import { useRouter } from 'next/navigation'
import { QrReader } from 'react-qr-reader'
import Balancer from 'react-wrap-balancer'
import { toast } from 'sonner'

export default function Scan() {
  const router = useRouter()

  const handleScan = (result: string | null) => {
    if (!result?.startsWith('https://rastreadito.vercel.app/product/')) {
      toast.error('QR no válido', {
        style: {
          background: '#F87171',
        }
      })
      return
    }

    const push = process.env.NODE_ENV === 'development'
      ? result.replace('https://rastreadito.vercel.app', 'http://localhost:3000')
      : result

    router.push(push)
  }

  return (
    <main className='relative h-screen overflow-hidden'>
      <div className='absolute inset-x-0 mx-auto max-w-7xl px-4'>
        <div className='relative flex items-center justify-center py-8 text-_white'>
          <Back className='absolute left-0 text-_white' />
          <h1 className='text-xl font-bold'>Escanear</h1>
        </div>
      </div>
      <div id='clip-path' className='absolute inset-0 -z-20 bg-_dark/50 backdrop-blur-sm' />
      <div className='absolute inset-0 -z-10 flex items-center justify-center'>
        <div className='border-corner relative h-60 w-60'>
          <span className='border_bottom' />
        </div>
      </div>
      <div className='flex h-full flex-col items-center justify-center space-y-[380px]'>
        <Balancer className='text-center'>
          <h1 className='text-4xl font-bold text-_white'>Escanea</h1>
          <p className='font-medium text-_grayTextLight'>Encuéntralo en la parte inferior de tu producto</p>
        </Balancer>
        <div />
      </div>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            handleScan(result?.getText())
          }

          if (!!error) {
            console.info(error)
          }
        }}
        className='absolute inset-0 -z-30'
        videoContainerStyle={{
          padding: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        videoStyle={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        constraints={{
          facingMode: 'environment',
        }}
      />

    </main>
  )
}
