'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {

  const router = useRouter()

  return (
    <>
    <div>
    <Image alt='Logo' className='hidden md:block cursor-pointer bg-cover'
     height={10} width={60} src='/mooonbg.png' onClick={() => router.push('/')}/>
    </div>
     </>
  )
}

export default Logo
