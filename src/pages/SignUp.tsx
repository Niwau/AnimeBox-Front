import { Heading, Button, Text, Flex, Image, Center } from '@chakra-ui/react'
import Gojo from '../assets/gojo.jpg'
import Logo from '../assets/logo.png'
import { useToast } from '@chakra-ui/react'
import { api } from '../services/api'
import { AxiosError } from 'axios'
import { Form, FormStructure, FormUtils } from '../components/Form'
import React from 'react'
import { ISignUp, signUpSchema } from '../schemas/schemas'
import { Link } from 'react-router-dom'
import { ErrorResponse } from '../types/types'

export const SignUp = () => {
  const toast = useToast()

  const onSubmit = async (form: ISignUp, utils: FormUtils<ISignUp>) => {
    try {
      await api.post('/account', form)
      toast({
        title: 'Conta criada com sucesso!',
        status: 'success',
      })
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>
      if (error.response?.data?.error == 'Esse usuário já está cadastrado') {
        utils.setError('email', {
          type: 'manual',
          message: 'Esse usuário já está cadastrado',
        })
      }
      return
    }
  }

  return (
    <Flex h='100%'>
      <Form
        containerProps={{
          p: 8
        }}
        header={
          <React.Fragment>
            <Center>
              <Image src={Logo} width={240} />
            </Center>
            <Heading>Cadastre-se</Heading>
          </React.Fragment>
        }
        structure={structure}
        onSubmit={onSubmit}
        footer={
          <React.Fragment>
            <Button type="submit" colorScheme="purple">
              Criar conta
            </Button>
            <Text>
              Já possui uma conta?{' '}
              <Text color="purple" textDecoration="underline" as={Link} to="/">
                Entrar
              </Text>
            </Text>
          </React.Fragment>
        }
      />
      <Image src={Gojo} h='100%' maxW='70%' objectFit={'cover'} />
    </Flex>
  )
}

const structure: FormStructure<ISignUp> = {
  defaultValues: {
    email: '',
    name: '',
    password: '',
  },
  inputs: [
    {
      label: 'Nome',
      name: 'name',
      placeholder: 'Nome',
      type: 'text',
    },
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
  schema: signUpSchema,
}
