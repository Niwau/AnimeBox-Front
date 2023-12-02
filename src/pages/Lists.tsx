import { Image, VStack, Text, Button, useToast, HStack, Stack } from '@chakra-ui/react'
import { useFetch } from '../hooks/useFetch'
import Empty from '../assets/empty.svg'
import { Plus } from '@phosphor-icons/react'
import { Modal } from '../components/Modal'
import { Form, FormStructure } from '../components/Form'
import { ICreateList, createListSchema } from '../schemas/schemas'
import { api } from '../services/api'
import { List } from '../components/List'
import { IList } from '../types/types'
import { DisplayLayout } from '../layouts/DisplayLayout'

export const Lists = () => {
  const { data, refetch } = useFetch<IList[]>({ url: '/lists' })

  const isEmpty = data?.length === 0

  const toast = useToast()

  const onSubmit = async (data: ICreateList) => {
    try {
      await api.post('/lists', data)
      await refetch()
    } catch (error) {
      toast({ description: 'Ocorreu um erro ao criar a lista', status: 'error' })
    }
  }

  const deleteList = async (id: number) => {
    try {
      await api.delete(`lists/${id}`)
      await refetch()
    } catch (error) {
      toast({
        description: 'Não foi possível remover a lista',
        status: 'error',
      })
    }
  }

  const editList = async (id: number, data: ICreateList) => {
    try {
      await api.patch(`lists/${id}`, data)
      await refetch()
    } catch (error) {
      toast({
        description: 'Não foi possível editar a lista',
        status: 'error',
      })
    }
  }

  const ListModal = () => (
    <Modal
      title="Nova Lista"
      body={({ close }) => (
        <Form
          structure={structure}
          onSubmit={(data) => {
            onSubmit(data)
            close()
          }}
          footer={
            <Button type="submit" colorScheme="purple">
              Criar
            </Button>
          }
        />
      )}
      trigger={({ open }) => (
        <Button leftIcon={<Plus size={24} />} aria-label="Create new list" colorScheme="purple" onClick={open}>
          Criar nova lista
        </Button>
      )}
    />
  )

  const EmptyCard = () => (
    <Stack justifyContent="center" alignItems="center">
      <VStack gap={8} w={'25%'}>
        <Image src={Empty} />
        <Text textAlign="center">
          Parece que você ainda não possui nenhuma lista criada. Crie uma nova lista para começar.
        </Text>
      </VStack>
    </Stack>
  )

  const UserLists = () => (
    <HStack gap={8} mt={16}>
      {data?.map((list, index) => (
        <List onDelete={deleteList} onEdit={editList} key={index} name={list.name} id={list.id} />
      ))}
    </HStack>
  )

  return (
    <DisplayLayout title="Listas" action={<ListModal />}>
      <Stack flex={1}>{isEmpty ? <EmptyCard /> : <UserLists />}</Stack>
    </DisplayLayout>
  )
}

const structure: FormStructure<ICreateList> = {
  defaultValues: {
    name: '',
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
