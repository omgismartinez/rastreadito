import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import clsx from 'clsx'

const buttonVariants = cva(
    'active:scale-95 inline-flex items-center justify-center rounded-2xl text-xl font-semibold backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-_primary disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-_primary',
    {
        variants: {
            variant: {
                default:
                    'bg-_primary text-_dark hover:bg-_primary/80',
                image:
                    'bg-_gray dark:bg-_darkText hover:bg-_gray/50 dark:hover:bg-_darkText/50 rounded-2xl overflow-hidden p-2 h-14 w-14',
                outline:
                    'border-2 border-_gray dark:border-_darkText',
                subtle:
                    'bg-_gray text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-_gray',
                ghost:
                    'bg-transparent hover:bg-_gray dark:hover:bg-_darkText dark:text-_primary data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
                link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-_gray hover:bg-transparent dark:hover:bg-transparent',
            },
            size: {
                default: 'h-16 py-2 px-4',
                sm: 'h-9 px-2 rounded-md',
                lg: 'h-11 px-8 rounded-md',
                nothing: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={clsx(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
