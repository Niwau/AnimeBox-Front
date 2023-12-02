import { Button, useToast } from '@chakra-ui/react'
import { Anime } from '../components/Anime'
import { useSearchContext } from '../contexts/SearchContext'
import { useFetch } from '../hooks/useFetch'
import { DisplayLayout } from '../layouts/DisplayLayout'
import { IAnime } from '../types/types'
import { Modal } from '../components/Modal'
import { Plus } from '@phosphor-icons/react'
import { Form } from '../components/Form'
import { ICreateAnime, createAnimeSchema } from '../schemas/schemas'
import React from 'react'
import { api } from '../services/api'

export const AnimesPage = () => {
  const { data, refetch } = useFetch<IAnime[]>({ url: '/animes' })
  const { search } = useSearchContext()

  const toast = useToast()

  const role = localStorage.getItem('user_role')
  const isAdmin = role == 'ADMIN'

  const onSubmit = async (data: ICreateAnime) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('sinopsis', data.sinopsis)
    formData.append('image', data.image[0])
    try {
      await api.post('/animes', formData)
      toast({ description: 'Anime adicionado', status: 'success' })
      await refetch()
    } catch (error) {
      toast({
        description: 'Não foi possível adicionar o anime',
        status: 'error',
      })
    }
  }

  const deleteAnime = async (id: number) => {
    try {
      await api.delete(`/animes/${id}`)
      toast({ description: 'Anime excluído com sucesso', status: 'success' })
      await refetch()
    } catch (error) {
      toast({
        description: 'Não foi possível excluir o anime',
        status: 'error',
      })
    }
  }

  return (
    <DisplayLayout
      title="Animes"
      action={
        isAdmin && (
          <Modal
            title="Adicionar anime"
            trigger={({ open }) => (
              <Button onClick={open} colorScheme="purple" leftIcon={<Plus size={24} />}>
                Adicionar anime
              </Button>
            )}
            body={({ close }) => (
              <Form
                onSubmit={(data) => {
                  onSubmit(data)
                  close()
                }}
                structure={{
                  inputs: [
                    {
                      label: 'Nome',
                      name: 'name',
                    },
                    {
                      label: 'Sinopse',
                      name: 'sinopsis',
                      render: 'textarea'
                    },
                    {
                      label: 'Imagem',
                      name: 'image',
                      type: 'file',
                    },
                  ],
                  defaultValues: {
                    name: '',
                    image: {} as FileList,
                    sinopsis: '',
                  },
                  schema: createAnimeSchema,
                }}
                footer={
                  <React.Fragment>
                    <Button colorScheme="purple" type="submit">
                      Adicionar
                    </Button>
                  </React.Fragment>
                }
              />
            )}
          />
        )
      }
    >
      {data
        ?.filter((anime) => anime.name.toLowerCase().includes(search.toLowerCase()))
        .map((anime) => <Anime key={anime.id} {...anime} onDelete={deleteAnime} />)}
    </DisplayLayout>
  )
}
