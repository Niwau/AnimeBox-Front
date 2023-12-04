import { Avatar, Button, Card, Heading, Stack, Text } from '@chakra-ui/react'
import { IUser } from '../types/types'
import { Tools } from './Tools'
import { Trash } from '@phosphor-icons/react'
import { Dialog } from './Dialog'

interface UserCardProps extends IUser {
  onDelete?: (id: number) => void
}

export const UserCard = ({ email, id, name, role, onDelete }: UserCardProps) => {
  const userRole = role === 'ADMIN' ? 'Administrador' : 'Usuário'

  return (
    <Tools
      body={
        <Dialog
          trigger={({ open }) => (
            <Button onClick={open} justifyContent="flex-start" variant="ghost" leftIcon={<Trash size={24} />}>
              Remover
            </Button>
          )}
          title='Remover usuário'
          message='Tem certeza que deseja remover este usuário?'
          onConfirm={() => onDelete && onDelete(id)}
        />
      }
    >
      <Card w="150px" p={4} gap={2}>
        <Stack>
          <Avatar name={name} alignSelf="center" />
          <Heading size="sm" maxW="100%" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {name}
          </Heading>
        </Stack>
        <Stack maxW="120px">
          <Text maxW="100%" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {email}
          </Text>
          <Text maxW="100%" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {userRole}
          </Text>
        </Stack>
      </Card>
    </Tools>
  )
}
