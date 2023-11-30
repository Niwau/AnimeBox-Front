import { Folder, Pencil, Trash } from '@phosphor-icons/react'
import { IList } from '../types/types'
import {
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
  Button,
  Stack,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { Dialog } from './Dialog'
import { Modal } from './Modal'
import { Form, FormStructure } from './Form'
import { ICreateList, createListSchema } from '../schemas/schemas'

interface ListProps extends Pick<IList, 'name' | 'id'> {
  onEdit: (id: number, data: ICreateList) => void
  onDelete: (id: number) => void
}

export const List = ({ name, id, onDelete, onEdit }: ListProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const initialFocusRef = useRef(null)

  const handleClick: React.MouseEventHandler<SVGSVGElement> | undefined = (e) => {
    e.preventDefault()
    if (isOpen) {
      onClose()
    } else {
      onOpen()
    }
  }

  const structure: FormStructure<ICreateList> = {
    defaultValues: {
      name: name,
    },
    inputs: [
      {
        label: 'Nome',
        name: 'name',
        placeholder: 'Nome',
      },
    ],
    schema: createListSchema,
  }

  return (
    <Popover placement="right" initialFocusRef={initialFocusRef} isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <VStack>
          <Folder cursor={'pointer'} size={64} weight="fill" onContextMenu={handleClick} />
          <Text maxW={24} whiteSpace={'nowrap'} overflow="hidden" textOverflow="ellipsis">
            {name}
          </Text>
        </VStack>
      </PopoverTrigger>
      <PopoverContent outline="none">
        <PopoverArrow />
        <PopoverHeader ref={initialFocusRef}>Ações</PopoverHeader>
        <PopoverBody>
          <Stack>
            <Modal
              title="Editar Lista"
              body={({ close }) => (
                <Form
                  structure={structure}
                  onSubmit={(data) => {
                    onEdit(id, data)
                    close()
                  }}
                  footer={
                    <Button type="submit" colorScheme="purple">
                      Salvar
                    </Button>
                  }
                />
              )}
              trigger={({ open }) => (
                <Button onClick={open} justifyContent="flex-start" variant="ghost" leftIcon={<Pencil size={24} />}>
                  Editar
                </Button>
              )}
            />
            <Dialog
              title="Excluir lista"
              trigger={({ open }) => (
                <Button onClick={open} justifyContent="flex-start" variant="ghost" leftIcon={<Trash size={24} />}>
                  Excluir
                </Button>
              )}
              message="Tem certeza que deseja excluir essa lista?"
              onConfirm={() => onDelete(id)}
            />
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
