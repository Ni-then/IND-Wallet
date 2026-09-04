"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
useRouter
const SidebarItem = ({href,title,icon}:{href:string,title:string,icon:React.ReactNode}) => {
    const router = useRouter()
  return (
    <div >
          <div className='cursor-pointer flex gap-2 p-2 hover:text-xl text-gray-200 duration-200 ' onClick={()=>router.push(href)}>
        <div>
            {icon}
        </div>
        <div>
            {title}
        </div>

        </div>
    </div>
  )
}

export default SidebarItem