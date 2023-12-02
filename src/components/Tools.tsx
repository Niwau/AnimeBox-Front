import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Box,
  Stack,
  PlacementWithLogical,
} from '@chakra-ui/react'
import React, { useRef } from 'react'

interface ToolsProps {
  children: React.ReactNode
  body: React.ReactNode;
  placement?: PlacementWithLogical;
  disabled?: boolean;
}

export const Tools = ({ children, body, placement='right', disabled }: ToolsProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const initialFocusRef = useRef(null)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (disabled) {
      return
    }

    if (isOpen) {
      onClose()
    } else {
      onOpen()
    }
  }

  return (
    <Popover placement={placement} initialFocusRef={initialFocusRef} isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box onContextMenu={handleClick}>{children}</Box>
      </PopoverTrigger>
      <PopoverContent outline="none">
        <PopoverArrow />
        <PopoverHeader ref={initialFocusRef}>Ações</PopoverHeader>
        <PopoverBody>
          <Stack>{body}</Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
