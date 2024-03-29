import { getCurrentUser } from '@/hooks/auth'
import { prisma } from '@/lib/prisma'
import { QrProductType } from '@/types'
import { Back } from '@/components/ui/back'
import { Suspense } from 'react'
import ContentLoader from 'react-content-loader'
import CategoriasData from './data'

async function getQr(acronimo: string, user: string | undefined) {
  const res = await prisma.qr.findMany({
    where: {
      producto: {
        categoria: {
          contains: acronimo,
        },
        usuario: user,
      }
    },
    include: {
      producto: true
    }
  })

  return res
}

export default async function CategoriaNombre({ params }: { params: { nombre: string } }) {
  const user = await getCurrentUser()
  const qr = getQr(params.nombre.toUpperCase(), user?.email)
  return (
    <div>
      <div className='relative flex items-center justify-center py-8'>
        <Back className='absolute left-0' />
        <h1 className='text-xl font-bold'>Categoria</h1>
      </div>
      <h1 className='truncate text-5xl font-bold capitalize leading-loose'>{params.nombre}</h1>
      <Suspense fallback={<FadingLoader />}>
        {/* @ts-expect-error Async Server Component */}
        <Categorias qr={qr} />
      </Suspense>
    </div>
  )
}

async function Categorias({ qr }: { qr: Promise<QrProductType[]> }) {
  const data = await qr
  return <CategoriasData data={data} />
}

const FadingLoader = () => {
  return (
    <>
      <ContentLoader
        className='h-96 w-full px-3 dark:hidden'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        <rect x='0' y='0' rx='5' ry='5' width='200' height='20' />
        <rect x='0' y='48' rx='5' ry='5' width='100%' height='32' />
        <rect x='0' y='96' rx='5' ry='5' width='100%' height='32' />
        <rect x='0' y='144' rx='5' ry='5' width='100%' height='32' />
        <rect x='0' y='192' rx='5' ry='5' width='100%' height='32' />
        <rect x='0' y='240' rx='5' ry='5' width='100%' height='32' />
      </ContentLoader>
      <ContentLoader
        className='hidden h-96 w-full px-3 dark:block'
        backgroundColor='#262626'
        foregroundColor='#212121'
      >
        <rect x='0' y='0' rx='5' ry='5' width='200' height='20' />
        <rect x='0' y='48' rx='5' ry='5' width='100%' height='32' />
        <rect x='0' y='96' rx='5' ry='5' width='100%' height='32' />
        <rect x='0' y='144' rx='5' ry='5' width='100%' height='32' />
        <rect x='0' y='192' rx='5' ry='5' width='100%' height='32' />
        <rect x='0' y='240' rx='5' ry='5' width='100%' height='32' />
      </ContentLoader>
    </>
  )
}
