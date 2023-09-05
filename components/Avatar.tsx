'use client'

import Image from "next/image"

interface Props {
    src: string | null | undefined
}

const Avatar = ({src}: Props) => {
  return (
    <Image className="rounded-full border-[2px] border-[#00df9a]"
     height={40} width={40} alt="Avatar" src={src || '/placeholder.jpg'}/>
  )
}

export default Avatar
