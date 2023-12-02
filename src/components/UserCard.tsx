import { Avatar, Card, Heading, Stack, Text } from '@chakra-ui/react'
import { IUser } from '../types/types'

export const UserCard = ({ email, id, name, role }: IUser) => {
  const userRole = role === 'ADMIN' ? 'Administrador' : 'Usuário'

  return (
    <Card w="150px" p={4} gap={2}>
      <Stack>
        <Avatar name={name} alignSelf="center" />
        <Heading size="sm" maxW="100%" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{name}</Heading>
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
  )
}
