import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from 'src/lib/utils'
import { buttonVariants } from './ui/button'
import { useTranslation } from 'react-i18next'

type Props = React.HTMLAttributes<HTMLElement>

export const SidebarNav = ({ className, ...props }: Props) => {
  const location = useLocation()
  const { t } = useTranslation('translation')

  const sidebarNavItems = [
    {
      title: t('loanTitle'),
      href: '/#loan',
    },
  ]

  return (
    <nav className={cn('px-4 flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)} {...props}>
      {sidebarNavItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            location.pathname + location.hash === item.href || location.pathname === '/'
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start',
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
