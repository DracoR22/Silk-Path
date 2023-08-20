'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {

  const router = useRouter()

  return (
    <Image alt='Logo' className='hidden md:block cursor-pointer'
     height={70} width={70} src='/silkpathbg.png' onClick={() => router.push('/')}/>
  )
}

export default Logo
