import {  useRef } from 'react'
import { Dialog } from '@headlessui/react'

export default function ConfigureIntegration({isOpen, setIsOpen}) {
  let completeButtonRef = useRef(null)

  function completeOrder() {
    // ...
  }

  return(
    <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    className="fixed z-10 inset-0 overflow-y-auto"
  >
    <div className="flex items-center justify-center min-h-screen">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="relative bg-white rounded max-w-sm mx-auto">
        <Dialog.Title>Complete your order</Dialog.Title>
        <p>Your order is all ready!</p>

        <button onClick={() => setIsOpen(false)}>Cancel</button>
        <button ref={completeButtonRef} onClick={completeOrder}>
            Complete order
        </button>
      </div>
    </div>
  </Dialog>
  )

}
