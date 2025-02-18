import Image from 'next/image'
import React from 'react'
import Button from './Button'

export default function Navbar({ logoLinkPath }: { logoLinkPath: string }) {
  return (
    <div className="bg-primary h-[10vh] px-5">
          <div className="w-full h-full flex items-center">
            <Button path={logoLinkPath}>
              <Image 
                className="w-auto 2xl:h-[6.5vh] xl:h-[6.5vh] h-[5.5vh]"
                alt="nudiance logo"
                src="/images/nudiance_logo.png"
                width={1000}
                height={800}
              />
            </Button>     
          </div>    
        </div>
  )
}
