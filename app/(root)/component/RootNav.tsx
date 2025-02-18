// 'use client'
import Image from 'next/image'
// import { useRouter } from 'next/navigation'
import React from 'react'

export default function RootNav() {
   return (
    <div className="bg-primary h-[10vh] px-5">
      <div className="w-full h-full flex items-center">
        <button
        >
          <Image 
            className="w-auto 2xl:h-[6.5vh] xl:h-[6.5vh] h-[5.5vh]"
            alt="nudiance logo"
            src="/images/nudiance_logo.png"
            width={1000}
            height={800}
          />
        </button>      
      </div>    
    </div>
  )
}