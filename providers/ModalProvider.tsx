'use client'

import RegisterModal from "@/components/modals/RegisterModal"
import LoginModal from "@/components/modals/LoginModal"
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
    <LoginModal/>
    </>
  )
}

export default ModalProvider
