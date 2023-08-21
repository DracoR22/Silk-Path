'use client'

import RegisterModal from "@/components/modals/RegisterModal"
import { useEffect, useState } from "react"

const ModalProvider = () => {

 const [isMounted, setIsMounted] = useState(false)

 useEffect(() => {
    setIsMounted(true)
 }, [])

 if(!isMounted) {
    return null
 }

  return (
    <>
    <RegisterModal/>
    </>
  )
}

export default ModalProvider
