'use client'

import { Button } from '@/components/ui/button'
import { Categoria, Galeria } from '@prisma/client'
import { AlertCircle, ImagePlus, Trash, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import NewGallery from './new-gallery'
import { AnimatePresence } from 'framer-motion'
import { Label } from '@/components/ui/label'
import UploadInput from './upload-input'
import { toast } from 'sonner'
import { useSupabase } from '../supabase-provider'
import { Input } from '@/components/ui/input'

interface GaleriaProps {
    categoria: Categoria & {
        nombreParams: string
        descripcionParams: string
    }
    galeriaData?: Galeria[]
}

export default function GaleriaView({
  categoria,
  galeriaData,
}: GaleriaProps) {
  const [galerias, setGalerias] = useState<Galeria[] | undefined>([])
  const [loading, setLoading] = useState(false)
  const [uploadImages, setUploadImages] = useState(false)
  const [search, setSearch] = useState('')
  const { supabase } = useSupabase()

  const handleGaleria = useCallback(async () => {
    setGalerias([])
    setLoading(true)

    const res = await fetch('/api/galeria')

    if (!res.ok) {
      throw new Error('Error al obtener imágenes')
    }

    const data: Galeria[] = await res.json()
    const filteredData = data.filter(imagen => imagen.categoriaAcronimo === categoria.acronimo)

    setGalerias(filteredData)
    setLoading(false)
  }, [categoria.acronimo])

  const handleDeleteImages = async (url: string, galeriaData: Galeria) => {
    const { data: { user } } = await supabase.auth.getUser()

    if (user?.email) {
      const imageName = url.split('/').pop()
      const path = `${user?.email}/${categoria.acronimo}/${galeriaData.nombre}/${imageName}`

      const remove = async () => {
        const { error } = await supabase
          .storage
          .from('galeria')
          .remove([path])

        if (error) {
          throw new Error(error.message)
        }

        const { error: errorDelete } = await supabase
          .from('galeria')
          .delete()
          .in('url', [url])

        if (errorDelete) {
          throw new Error(errorDelete.message)
        }
      }

      toast.promise(remove, {
        loading: 'Eliminando imagen...',
        success: () => {
          handleGaleria()
          return 'Imagen eliminada'
        },
        error: (err) => err.message,
      })
    }
  }

  const handleDeleteGaleria = async (galeriaData: Galeria) => {
    toast(`¿Estás seguro de eliminar la galería ${galeriaData.nombre}?`, {
      icon: <AlertCircle size={18} />,
      cancel: {
        label: 'Cancelar',
        onClick: () => {
          toast.dismiss()
        },
      },
      important: true,
      action: {
        label: 'Eliminar',
        onClick: () => {
          toast.promise(deleteGaleria, {
            loading: 'Eliminando galería...',
            success: () => {
              handleGaleria()
              return 'Galería eliminada'
            },
            error: (err) => err.message,
          },
          )
        }
      },
    })

    const deleteGaleria = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user?.email) {
        const remove = async () => {
          const { error } = await supabase
            .storage
            .from('galeria')
            .remove([`${user?.email}/${categoria.acronimo}/${galeriaData.nombre}`])

          if (error) {
            throw new Error(error.message)
          }

          const api = await fetch(`/api/galeria/${galeriaData.id}`, {
            method: 'DELETE',
          })

          if (!api.ok) {
            throw new Error('Error al eliminar la galería')
          }
        }

        toast.promise(remove, {
          loading: 'Eliminando galería...',
          success: () => {
            handleGaleria()
            return 'Galería eliminada'
          },
          error: (err) => err.message,
        })
      }
    }
  }

  const handleUploadFiles = async (files: { file: File, index: number }[], galeriaData: Galeria) => {
    const { data: { user } } = await supabase.auth.getUser()

    if (files.length && user?.email) {
      let urls: string[] = galeriaData.url
      const upload = async () => {
        const urlImages = await Promise.all(
          files.map(async ({ file, index }) => {
            const storage_upload = await supabase
              .storage
              .from('galeria')
              .upload(`${user?.email}/${categoria.acronimo}/${galeriaData.nombre}/image-${index}-${new Date().getTime()}`, file, {
                cacheControl: '3600',
                upsert: true,
              })

            if (storage_upload.error) {
              throw new Error('Error al subir imágenes')
            }

            const url = supabase.storage.from('galeria').getPublicUrl(storage_upload.data.path).data.publicUrl

            if (urls[index]) {
              const imageName = urls[index].split('/').pop()
              const path = `${user?.email}/${categoria.acronimo}/${galeriaData.nombre}/${imageName}`

              const { error } = await supabase
                .storage
                .from('galeria')
                .remove([path])

              if (error) {
                throw new Error('Error al eliminar la previa imagen')
              }

              urls[index] = url
            } else {
              urls.push(url)
            }

            return url
          })
        )

        if (urlImages.length !== files.length) {
          throw new Error('Error al subir imágenes')
        }

        if (urls.length <= 4) {
          const res = await fetch('/api/galeria', {
            method: 'POST',
            body: JSON.stringify({
              id: galeriaData.id,
              nombre: galeriaData.nombre,
              categoria: galeriaData.categoriaAcronimo || '',
              descripcion: galeriaData.descripcion || '',
              url: urls,
            })
          })

          if (!res.ok) {
            throw new Error('Error al guardar imágenes')
          }

          urls = []
          return res
        } else {
          throw new Error('El número máximo de imágenes es 4')
        }
      }

      toast.promise(upload, {
        loading: 'Subiendo imágenes...',
        success: () => {
          handleGaleria()
          return `${files.length} imágenes subidas correctamente`
        },
        error: (err) => err.message,
      })
    }

  }

  const filteredGalerias = useMemo(() => {
    if (galerias) {
      return galerias.filter(galeria => galeria.nombre.toLowerCase().includes(search.toLowerCase()))
    }
  }, [galerias, search])

  useEffect(() => {
    handleGaleria()
  }, [handleGaleria])

  useEffect(() => {
    !galeriaData && handleGaleria()
  }, [categoria, galeriaData, handleGaleria])

  return (
    <main className='flex flex-col gap-4'>
      <div className='flex justify-end items-center p-1 gap-3 h-12 w-full md:max-w-sm ml-auto'>
        <Input
          variant='search'
          name='search'
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Buscar por nombre'
          className='p-1 h-full border-2'
        />
        <Button
          type='button'
          onClick={() => setUploadImages(!uploadImages)}
          className='p-2'
          variant={'outline'}
          size={'nothing'}
        >
          <h1 className='sr-only text-base font-semibold whitespace-nowrap text-_grayText'>
            {uploadImages ? 'Cancelar' : 'Subir imágenes'}
          </h1>
          {uploadImages ? <X size={24} /> : <ImagePlus />}
        </Button>
      </div>

      <AnimatePresence>
        {uploadImages &&
        <NewGallery
          onClose={() => { setUploadImages(false); handleGaleria() }}
          nombre={categoria.nombreParams}
          descripcion={categoria.descripcionParams}
          categoria={categoria.acronimo}
          boundary={false}
        />}
      </AnimatePresence>

      {galerias && galerias.length > 0
        ? <div className='flex flex-col gap-6'>
          {filteredGalerias?.map((galeria) => (
            <div key={galeria.id} className='flex flex-col gap-2'>
              <div className='flex justify-between items-center gap-4'>
                <Label className='text-_darkText dark:text-_primary text-xs font-semibold'>{galeria.nombre}</Label>
                <button onClick={() => handleDeleteGaleria(galeria)} className='p-1 bg-_darkText w-8 h-8 rounded-md active:scale-90'>
                  <Trash className='text-red-400 inline' size={16} />
                </button>
              </div>
              <div className='grid grid-flow-col gap-5 justify-start overflow-auto scrollbar-none md:scrollbar-thin'>
                <UploadInput
                  urls={galeria.url}
                  onValue={(values) => handleUploadFiles(values, galeria)}
                  onRemove={(url) => handleDeleteImages(url, galeria)}
                />
              </div>
            </div>
          ))}
        </div>
        : <>
          {loading
            ? <div className='grid grid-flow-row grid-cols-2 sm:grid-cols-4 md:grid-cols-5 justify-center items-center gap-5'>
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={'relative bg-_gray dark:bg-_darkText animate-pulse rounded-2xl w-28 h-28 m-auto'}
                />
              ))}
            </div>
            : <div className='flex justify-center items-center h-52'>
              {galerias
                ? <span>No hay imágenes en esta categoría.</span>
                : <span>Selecciona una categoría para ver las imágenes.</span>}
            </div>}
        </>
      }
    </main>
  )
}
