import { PropsWithChildren } from 'react'
import { cn } from 'src/lib/utils'

type TypographyProps = PropsWithChildren<{ className?: string }>
export const TypographyH4 = ({ className, children }: TypographyProps) => {
  return <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>{children}</h4>
}
