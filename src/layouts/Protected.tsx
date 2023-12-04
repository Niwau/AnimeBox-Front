import { Center, Text } from '@chakra-ui/react'
import { useAuthContext } from '../contexts/AuthContext'
import { Children } from '../types/types'

export const Protected = ({ children }: Children) => {
  const { isAuth } = useAuthContext()

  if (!isAuth) {
    return (
      <Center h='100%'>
        <Text>Você precisa estar logado para visualizar este conteúdo.</Text>
      </Center>
    )
  }

  return children
}
