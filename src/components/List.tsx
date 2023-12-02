import { Folder, Pencil, Trash } from '@phosphor-icons/react'
import { IList } from '../types/types'
import { Dialog } from './Dialog'
import { Modal } from './Modal'
import { Form, FormStructure } from './Form'
import { ICreateList, createListSchema } from '../schemas/schemas'
import { Tools } from './Tools'
import { Button, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'

interface ListProps extends Pick<IList, 'name' | 'id'> {
  onEdit: (id: number, data: ICreateList) => void
  onDelete: (id: number) => void
}

export const List = ({ name, id, onDelete, onEdit }: ListProps) => {
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
    <Tools
      body={
        <React.Fragment>
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
        </React.Fragment>
      }
    >
      <VStack>
        <Link to={`/lists/${id}`}>
          <Folder cursor={'pointer'} size={64} weight="fill" />
        </Link>
        <Text maxW={24} whiteSpace={'nowrap'} overflow="hidden" textOverflow="ellipsis">
          {name}
        </Text>
      </VStack>
    </Tools>
  )
}
