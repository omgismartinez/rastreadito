'use client'

import FormMetadata from '@/components/form-metadata'
import ModalDialog from '@/components/modal/modal-dialog'
import { QrProductType } from '@/types'
import { Label } from '@/components/ui/label'
import { User } from '@supabase/supabase-js'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import ImagePreview from './image-preview'

export default function ProductInfo({ data, user }: { data: QrProductType, user: User | null }) {
  const {
    producto: {
      nombre,
      imagen,
      descripcion,
      thc,
      cbd,
      categoria,
      aroma,
      efecto,
      cepa,
      fabricante,
      proveedor,
      pais,
      lote,
      peso,
      precio,
      certificado,
      notas,
      fechaRegistro,
      fechaCaducidad,
      fechaCosecha,
      fechaEnvasado,
      usuario,
    }
  } = data
  const [edit, setEdit] = useState(false)
  return (
    <>
      <div className='flex gap-2 py-4'>
        <span className='inline text-5xl font-bold'>
          {nombre}{' '}
          {user?.email === usuario &&
            <Edit
              onClick={() => setEdit(true)}
              className='inline cursor-pointer dark:text-_primary'
            />}
        </span>
      </div>
      <div className='my-10 flex flex-col gap-12'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          <ImagePreview imagenes={imagen} alt={nombre} />
          <div className='flex flex-col gap-7'>
            <div className='md:order-2'>
              <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Descripción</Label>
              <span className='block text-base'>{descripcion}</span>
            </div>
            <div className='order-1 flex flex-col gap-3'>
              <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Porcentaje</Label>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <Label className='text-sm font-semibold'>THC</Label>
                    <span className='text-sm font-semibold'>{thc}%</span>
                  </div>
                  <div className='h-2 rounded-full bg-_gray dark:bg-_darkText'>
                    <div className='h-full cursor-pointer rounded-full bg-_primary transition hover:animate-pulse hover:bg-_primary/80' style={{ width: `${thc}%` }} />
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <Label className='text-sm font-semibold'>CBD</Label>
                    <span className='text-sm font-semibold'>{cbd}%</span>
                  </div>
                  <div className='h-2 rounded-full bg-_gray dark:bg-_darkText'>
                    <div className='h-full cursor-pointer rounded-full bg-_primary transition hover:animate-pulse hover:bg-_primary/80' style={{ width: `${cbd}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-7'>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Categoria</Label>
            <span className='text-base font-semibold'>{categoria}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Aroma</Label>
            <span className='text-base font-semibold'>{aroma}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Efecto</Label>
            <span className='text-base font-semibold'>{efecto}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Cepa</Label>
            <span className='text-base font-semibold'>{cepa}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Fabricante</Label>
            <span className='text-base font-semibold'>{fabricante}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Proveedor</Label>
            <span className='text-base font-semibold'>{proveedor}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Pais</Label>
            <span className='text-base font-semibold'>{pais}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Lote</Label>
            <span className='text-base font-semibold'>{lote ? lote : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Precio</Label>
            <span className='text-base font-semibold'>${precio}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Peso</Label>
            <span className='text-base font-semibold'>{peso}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Certificado</Label>
            <span className='text-base font-semibold'>{certificado ? certificado : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Notas</Label>
            <span className='text-base font-semibold'>{notas ? notas : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Fecha de registro</Label>
            <span className='text-base font-semibold'>{new Date(fechaRegistro).toLocaleString()}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Fecha de caducidad</Label>
            <span className='text-base font-semibold'>{fechaCaducidad ? new Date(fechaCaducidad).toLocaleString().split(',')[0] : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Fecha de cosecha</Label>
            <span className='text-base font-semibold'>{fechaCosecha ? new Date(fechaCosecha).toLocaleString().split(',')[0] : 'No aplica'}</span>
          </div>
          <div className='flex flex-col gap-3'>
            <Label className='text-xs font-semibold uppercase text-_grayTextLight'>Fecha de envasado</Label>
            <span className='text-base font-semibold'>{fechaEnvasado ? new Date(fechaEnvasado).toLocaleString().split(',')[0] : 'No aplica'}</span>
          </div>
        </div>
      </div>
      {edit &&
        <ModalDialog
          onOpenChange={() => {
            setEdit(false)
          }}
        >
          <div className='sticky top-0 z-50 flex flex-col bg-_white dark:bg-_dark'>
            <div className='py-4'>
              <h1 className='text-5xl font-bold'>{nombre}</h1>
            </div>
          </div>
          <FormMetadata
            onEditChange={() => {
              setEdit(false)
              window.location.reload()
            }}
            className='relative overflow-auto p-1 scrollbar-thin'
            type='floating'
            producto={data.producto}
          />
        </ModalDialog>
      }
    </>
  )
}
