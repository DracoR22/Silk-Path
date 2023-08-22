'use client'

import Image from "next/image"

interface Props {
    src: string | null | undefined
}

const Avatar = ({src}: Props) => {
  return (
    <Image className="rounded-full" height={40} width={40} alt="Avatar" src={src || '/placeholder.jpg'}/>
  )
}

export default Avatar
