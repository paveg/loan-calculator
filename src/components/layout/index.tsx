import React from 'react'
import { Separator } from '../ui/separator'
import { SidebarNav } from '../sidebar-nav'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

export const getNoneLayout = (page: React.ReactElement) => page

export const getDefaultLayout = (page: React.ReactElement) => {
  return (
    <>
      <div className="space-y-6 p-4 pb-16 md:block">
        <div className="space-y-0.5">
          <h1 className="text-3xl font-bold tracking-tight">Loan Calculator</h1>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{page}</div>
        </div>
      </div>
      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-200 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground md:text-sm">&copy; 2024 Funai</p>
        </div>
        <div>
          <Button asChild variant="ghost" size="icon">
            <Link to="https://github.com/paveg/loan-calculator" target="_blank" rel="noopener noreferrer">
              <GitHubLogoIcon className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </footer>
    </>
  )
}
