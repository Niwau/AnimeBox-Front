import { NavLink, useLocation } from 'react-router-dom'
import { Link, HStack, Input, FormControl, FormLabel, Button, useToast } from '@chakra-ui/react'
import { useAuthContext } from '../contexts/AuthContext'
import { Modal } from './Modal'
import { Form } from './Form'
import { updateProfileSchema } from '../schemas/schemas'
import { useFetch } from '../hooks/useFetch'
import { IUser } from '../types/types'
import React from 'react'
import { Dialog } from './Dialog'
import { api } from '../services/api'
import { useSearchContext } from '../contexts/SearchContext'

export const Header = () => {
  const { logout } = useAuthContext()
  const { setSearch, search } = useSearchContext()
  const { data, refetch } = useFetch<IUser>({ url: '/account' })
  const toast = useToast()

  const location = useLocation()

  const deleteAccount = async () => {
    try {
      await api.delete('/account')
      toast({ description: 'Conta excluída com sucesso', status: 'success' })
      logout()
    } catch (error) {
      toast({ description: 'Não foi possível excluir a conta', status: 'error' })
    }
  }

  const editAccount = async (name: string) => {
    try {
      await api.patch('/account', {
        name,
      })
      refetch()
      toast({ description: 'O seu nome foi alterado', status: 'success' })
    } catch (error) {
      toast({ description: 'Não foi possível editar a conta', status: 'error' })
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <HStack py={4} px={16} gap={4} fontWeight={500}>
      <Link as={NavLink} to="/animes">
        Animes
      </Link>
      <Link as={NavLink} to="/lists">
        Listas
      </Link>
      <Link as={NavLink} to="/users">
        Usuários
      </Link>
      <Modal
        title="Perfil"
        trigger={({ open }) => <Link onClick={open}>Perfil</Link>}
        body={({ close }) => (
          <Form
            onSubmit={async (data) => {
              if (data.name) {
                await editAccount(data.name)
              }
              close()
            }}
            structure={{
              inputs: [
                {
                  name: 'name',
                  label: 'Nome',
                },
              ],
              schema: updateProfileSchema,
              defaultValues: {
                name: data?.name,
              },
            }}
            footer={
              <React.Fragment>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input disabled value={data?.email} />
                </FormControl>
                <HStack justifyContent="flex-end">
                  <Dialog
                    onConfirm={deleteAccount}
                    title="Excluir conta"
                    message="Tem certeza que deseja excluir sua conta?"
                    trigger={({ open }) => (
                      <Button
                        variant="outline"
                        colorScheme="red"
                        onClick={() => {
                          open()
                        }}
                      >
                        Excluir
                      </Button>
                    )}
                  />
                  <Button colorScheme="purple" type="submit">
                    Salvar
                  </Button>
                </HStack>
              </React.Fragment>
            }
          />
        )}
      />
      {location.pathname == '/animes' && (
        <Input onChange={onInputChange} placeholder="Pesquisar" flex={0.4} mx="auto" value={search}/>
      )}
      <Link ml="auto" onClick={logout}>
        Sair
      </Link>
    </HStack>
  )
}
