'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Categoria, Producto, Qr } from '@prisma/client'
import { toast } from 'sonner'
import qs from 'query-string'

import { Info, Save } from 'lucide-react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/ui/select'
import { Back } from '@/ui/back'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Button } from '@/ui/button'

export default function Metadata() {
    const router = useRouter()
    const [categorias, setCategorias] = useState<Categoria[]>([])

    const getCategorias = async () => {
        const res = await fetch('/api/categorias')
        const data = await res.json()
        return data
    }

    useEffect(() => {
        getCategorias().then(setCategorias)
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries()) as object as Producto

        const res = async () => {
            const create = await fetch('/api/metadata', {
                method: 'POST',
                body: JSON.stringify(data),
            })

            if (create.status !== 200) {
                throw new Error('Error al guardar')
            }

            return await create.json()
        }

        const qr = async (data: Producto) => {
            const codigo = generateQuery(data)

            if (!codigo) {
                throw new Error('Faltan datos para generar código QR')
            }

            const create = await fetch('/api/qr', {
                method: 'POST',
                body: JSON.stringify({ codigo, idProducto: data.id }),
            })

            return await create.json()
        }

        toast.promise(res, {
            loading: 'Guardando...',
            success: (producto: Producto) => {
                toast.promise(qr(producto), {
                    loading: 'Generando código QR...',
                    success: (qr: Qr) => {
                        router.push(qr.codigo)
                        return <div>Código QR <strong>#{qr.id}</strong> generado</div>
                    },
                    error: 'Error al generar código QR',
                })
                return <div>Producto <strong>{producto.nombre}</strong> guardado</div>
            },
            error: 'Error al guardar',
        })
    }

    const generateQuery = useCallback((data: Producto) => {
        const updatedQuery: any = {
            fecha: data.fechaRegistro,
            id: data.id,
            nombre: data.nombre,
            categoria: data.categoria,
        }

        const url = qs.stringifyUrl({
            url: '',
            query: updatedQuery
        }, { skipNull: true })

        return url
    }, [])

    return (
        <div className='px-4 min-h-screen relative max-w-7xl mx-auto'>
            <div className='flex justify-center items-center py-8 relative'>
                <Back className='absolute left-0' />
                <h1 className='font-bold text-xl'>Metadata</h1>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-7 my-8'>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <h3 className='font-semibold'>Información</h3>
                        <Info />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Input name='nombre' labelText='Nombre' placeholder='Purple Kush' required />
                        <Textarea name='descripcion' labelText='Descripción' placeholder='Purple Kush' required />
                        <Select name='categoria' required>
                            <SelectTrigger labelText='Tipo de producto'>
                                <SelectValue placeholder='Selecciona un tipo de producto' />
                            </SelectTrigger>
                            <SelectContent>
                                {categorias.map(({ nombre, acronimo }) => (
                                    <SelectItem
                                        className='first:rounded-t-xl last:rounded-b-xl placeholder:text-_primary'
                                        key={acronimo}
                                        value={acronimo}
                                    >
                                        {nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input name='imagen' labelText='URL' placeholder='purpleKush.png' required />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <h3 className='font-semibold'>Características</h3>
                        <Info />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Input name='cepa' labelText='Cepa' placeholder='Purple Kush' required />
                        <Input name='thc' labelText='THC' placeholder='0.0' required variant='porcentage' />
                        <Input name='cbd' labelText='CBD' placeholder='0.0' required variant='porcentage' />
                        <Input name='aroma' labelText='Aroma' placeholder='Tierra, pino, dulce' required />
                        <Input name='efecto' labelText='Efectos' placeholder='Relajante, calmante, eufórico' required />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <h3 className='font-semibold'>Fabricación</h3>
                        <Info />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Input name='fabricante' labelText='Fabricante' placeholder='Rastreadito' required />
                        <Input name='pais' labelText='País' placeholder='México' required />
                        <Input name='proveedor' labelText='Proveedor' placeholder='Rastreadito Co.' required />
                        <Input name='precio' labelText='PRECIO' placeholder='0' variant='currency' />
                        <Input name='peso' labelText='PESO' placeholder='0' variant='weight' />
                        <Input name='fechaCosecha' labelText='Cosecha' variant='date' />
                        <Input name='fechaEnvasado' labelText='Envasado' variant='date' />
                        <Input name='fechaCaducidad' labelText='Caducidad' variant='date' />
                        <Input name='lote' labelText='Lote' placeholder='RD-2023-01-01' />
                        <Input name='certificado' labelText='Certificado' placeholder='URL de analisis de laboratorio' />
                        <Textarea name='notas' labelText='Notas' placeholder='Este producto se cosecho 4:20am' />
                    </div>
                </div>
                <div className='absolute w-16 right-4'>
                    <Button type='submit' className='w-16 fixed bottom-8'>
                        <Save />
                    </Button>
                </div>
            </form>
        </div>
    )
}
