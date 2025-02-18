import React from 'react'
import Link from "next/link";

export default function Button({children}: {children: React.ReactNode | string}) {
  return (
    <Link 
      href="/login" 
      className="bg-primary rounded 2xl:py-2 xl:py-2 py-1 px-5 text-white font-semibold"
    >
      { children }
    </Link>
    
  )
}
