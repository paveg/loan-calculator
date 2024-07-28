import React from 'react'
import { Separator } from '../ui/separator'
import { SidebarNav } from '../sidebar-nav'

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
    </>
  )
}
