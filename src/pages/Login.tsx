import { Heading, Button, Text, Flex, Image, Center, Box } from '@chakra-ui/react'
import Gojo from '../assets/gojo.jpg'
import Logo from '../assets/logo.png'
import { api } from '../services/api'
import { Form, FormStructure, FormUtils } from '../components/Form'
import React from 'react'
import { ILogin, loginSchema } from '../schemas/schemas'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

interface LoginResponse {
  token: string
}

export const Login = () => {
  const { setIsAuth } = useAuthContext()

  const onSubmit = async (form: ILogin, utils: FormUtils<ILogin>) => {
    try {
      const res = await api.post<LoginResponse>('/account/login', form)
      localStorage.setItem('token', res.data.token)
      setIsAuth(true)
    } catch (e) {
      utils.setError('email', {
        message: 'Email ou senha inválidos',
      })
      return
    }
  }

  return (
    <Flex>
      <Box flex={2}>
        <Form
          header={
            <React.Fragment>
              <Center>
                <Image src={Logo} width={240} />
              </Center>
              <Heading>Login</Heading>
            </React.Fragment>
          }
          structure={structure}
          onSubmit={onSubmit}
          footer={
            <React.Fragment>
              <Button type="submit" colorScheme="purple">
                Entrar
              </Button>
              <Text>
                Não possui uma conta?{' '}
                <Text color="purple" textDecoration="underline" as={Link} to="/signup">
                  Cadastre-se
                </Text>
              </Text>
            </React.Fragment>
          }
        />
      </Box>
      <Image src={Gojo} h={'100%'} objectFit={'cover'} />
    </Flex>
  )
}

const structure: FormStructure<ILogin> = {
  defaultValues: {
    email: '',
    password: '',
  },
  inputs: [
    {
      label: 'Email',
      name: 'email',
      placeholder: 'Email',
      type: 'email',
    },
    {
      label: 'Senha',
      name: 'password',
      placeholder: 'Senha',
      type: 'password',
    },
  ],
  schema: loginSchema,
}
