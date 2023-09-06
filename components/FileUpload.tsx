'use client'

import { UploadDropzone } from "@/lib/uploadthing"

import { X } from "lucide-react"
import Image from "next/image"

import '@uploadthing/react/styles.css'

interface FileUploadProps {
    onChange: (url?: string) => void
    value: string
    endpoint: 'postImage' | 'userImage'
}

const FileUpload = ({onChange, value, endpoint}: FileUploadProps) => {

  if(value) {
    return (
        <div className="relative h-70 w-70">
          <Image width={200} height={200} src={value} alt="Upload" className="object-cover rounded-lg"/>
          <button onClick={() => onChange('')} 
          className="bg-rose-500 text-neutral-100 p-1 rounded-full absolute top-0 right-0 shadow-sm">
           <X className="h-4 w-4"/>
          </button>
        </div>
      )
  }

  return (
    <UploadDropzone endpoint={endpoint} onClientUploadComplete={(res) => onChange(res?.[0].url)}
    onUploadError={(error: Error) => {console.log(error)}}/>
  )
}

export default FileUpload
