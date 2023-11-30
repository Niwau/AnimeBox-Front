import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Modal as ChakraModal,
} from '@chakra-ui/react'
import React from 'react'

interface ModalProps {
  body: ({ close }: BodyParams) => React.ReactNode
  title: string
  trigger: ({ open }: TriggerParams) => React.ReactNode
}

interface TriggerParams {
  open: () => void
}

interface BodyParams {
  close: () => void
}

export const Modal = ({ body, title, trigger }: ModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

  return (
    <>
      {trigger({ open: onOpen })}

      <ChakraModal isCentered finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{body({ close: onClose })}</ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  )
}
