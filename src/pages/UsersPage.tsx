import { Button, useToast } from '@chakra-ui/react'
import { UserCard } from '../components/UserCard'
import { useFetch } from '../hooks/useFetch'
import { DisplayLayout } from '../layouts/DisplayLayout'
import { api } from '../services/api'
import { IUser } from '../types/types'
import { Modal } from '../components/Modal'
import { Plus } from '@phosphor-icons/react'
import { Form } from '../components/Form'
import { ISignUp, signUpSchema } from '../schemas/schemas'

export const UsersPage = () => {
  const { data, refetch } = useFetch<IUser[]>({ url: '/users' })

  const toast = useToast()

  const deleteUser = async (id: number) => {
    try {
      await api.delete(`users/${id}`)
      toast({ description: 'Usuário removido com sucesso', status: 'success' })
      refetch()
    } catch (error) {
      toast({ description: 'Não foi possível remover o usuário', status: 'error' })
    }
  }

  const createUser = async (data: ISignUp) => {
    try {
      await api.post('users', data)
      toast({ description: 'Usuário criado com sucesso', status: 'success' })
      refetch()
    } catch (error) {
      toast({ description: 'Não foi possível criar o usuário', status: 'error' })
    }
  }

  return (
    <DisplayLayout
      title="Usuários"
      action={
        <Modal
          trigger={({ open }) => (
            <Button colorScheme="purple" onClick={open} leftIcon={<Plus size={24} />}>
              Criar Administrador
            </Button>
          )}
          title="Criar Administrador"
          body={({ close }) => (
            <Form
              onSubmit={async (data) => {
                await createUser(data)
                close()
              }}
              structure={{
                schema: signUpSchema,
                defaultValues: {
                  name: '',
                  email: '',
                  password: '',
                },
                inputs: [
                  {
                    name: 'name',
                    label: 'Nome',
                  },
                  {
                    name: 'email',
                    label: 'Email',
                  },
                  {
                    name: 'password',
                    label: 'Senha',
                    type: 'password',
                  },
                ],
              }}
              footer={(
                <Button colorScheme='purple' type='submit'>Criar Administrador</Button>
              )}
            />
          )}
        />
      }
    >
      {data?.map((user) => <UserCard key={user.id} onDelete={deleteUser} {...user} />)}
    </DisplayLayout>
  )
}
