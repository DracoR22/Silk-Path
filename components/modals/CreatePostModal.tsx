'use client'

import CreateForm from "../forms/CreateForm"
import { ScrollArea } from "../ui/scroll-area"
import Modal from "./Modal"
import useCreatePostModal from "@/hooks/useCreatePostModal"

const CreatePostModal = () => {

 const { onClose, isOpen } = useCreatePostModal()

 const onChange = (open: boolean) => {
    if(!open) {
        onClose()
    }
 }

  return (
    <Modal title="Create post" isOpen={isOpen} onChange={onChange}>
       <ScrollArea>
         <CreateForm/>
       </ScrollArea>
    </Modal>
  )
}

export default CreatePostModal
