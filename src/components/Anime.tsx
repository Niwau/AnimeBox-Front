import { Stack, Image, Text, useToast, Button } from '@chakra-ui/react'
import { IAnime, IList } from '../types/types'
import { Link } from 'react-router-dom'
import { ISelectList, selectListSchema } from '../schemas/schemas'
import { api } from '../services/api'
import { useFetch } from '../hooks/useFetch'
import { Tools } from './Tools'
import React from 'react'
import { Modal } from './Modal'
import { Form } from './Form'
import { Plus, Trash } from '@phosphor-icons/react'
import { Dialog } from './Dialog'

interface AnimeProps extends Omit<IAnime, 'sinopsis'> {
  disabled?: boolean;
  onDelete?: (id: number) => Promise<void> | void;
}

export const Anime = ({ image, name, id, disabled, onDelete }: AnimeProps) => {
  const toast = useToast()

  const { data: lists } = useFetch<IList[]>({ url: '/lists' })

  const role = localStorage.getItem('user_role')
  const isAdmin = role == 'ADMIN'

  const onSubmit = async (data: ISelectList) => {
    try {
      await api.post('/lists/add', {
        anime_id: id,
        list_id: data.list_id,
      })
      toast({ description: 'Anime adicionado na lista', status: 'success' })
    } catch (error) {
      toast({ description: 'Não foi possível adicionar o anime na lista', status: 'error' })
    }
  }

  const ToolsActions = () => {
    return (
      <React.Fragment>
        <Modal
          body={({ close }) => (
            <Form
              footer={
                <Button colorScheme="purple" type="submit" leftIcon={<Plus size={24} />}>
                  Adicionar
                </Button>
              }
              onSubmit={(data) => {
                onSubmit(data)
                close()
              }}
              structure={{
                inputs: [
                  {
                    label: 'Lista',
                    name: 'list_id',
                    render: 'select',
                    options: lists?.map((list) => ({ label: list.name, value: list.id.toString() })),
                  },
                ],
                schema: selectListSchema,
                defaultValues: {
                  list_id: '',
                },
              }}
            />
          )}
          title="Adicionar anime na lista"
          trigger={({ open }) => (
            <Button onClick={open} justifyContent="flex-start" variant="ghost" leftIcon={<Plus size={24} />}>
              Adicionar na lista...
            </Button>
          )}
        />
        {isAdmin && (
          <Dialog
            title="Excluir anime"
            message="Tem certeza que deseja excluir o anime?"
            onConfirm={async () => {
              onDelete && await onDelete(id)
            }}
            trigger={({ open }) => (
              <Button onClick={open} justifyContent="flex-start" variant="ghost" leftIcon={<Trash size={24} />}>
                Excluir anime
              </Button>
            )}
          />
        )}
      </React.Fragment>
    )
  }

  const AnimeCard = () => (
    <Stack as={Link} to={`/animes/${id}`}>
      <Image src={image} h={240} aspectRatio="12/16" />
      <Text>{name}</Text>
    </Stack>
  )

  if (disabled) {
    return <AnimeCard />
  }

  return (
    <Tools body={<ToolsActions />}>
      <AnimeCard />
    </Tools>
  )
}
