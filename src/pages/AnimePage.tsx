import { useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { useFetch } from '../hooks/useFetch'
import {
  Stack,
  Image,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import { IAnime, IComment } from '../types/types'
import { useForm } from 'react-hook-form'
import { ICreateComment, createCommentSchema } from '../schemas/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../services/api'
import { Tools } from '../components/Tools'
import { Trash } from '@phosphor-icons/react'
import React from 'react'
import { Dialog } from '../components/Dialog'

export const AnimePage = () => {
  const { id } = useParams<{ id: string }>()
  const { data } = useFetch<IAnime>({ url: `/animes/${id}` })
  const { data: comments, refetch } = useFetch<IComment[]>({ url: `/animes/${id}/comments` })

  const userID = localStorage.getItem('user_id')

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField
  } = useForm<ICreateComment>({
    defaultValues: {
      comment: '',
    },
    resolver: zodResolver(createCommentSchema),
  })

  const toast = useToast()

  const AnimeInfo = () => (
    <Stack>
      <Heading>{data?.name}</Heading>
      <Text>{data?.sinopsis}</Text>
    </Stack>
  )

  const onSubmit = handleSubmit(async (data) => {
    try {
      await api.post(`/animes/${id}/comments`, data)
      await refetch()
      resetField('comment')
    } catch (error) {
      toast({ description: 'Não foi possível adicionar o comentário', status: 'error' })
    }
  })

  const deleteComment = async (commentId: number) => {
    try {
      await api.delete(`/animes/${id}/comments/${commentId}`)
      await refetch()
      toast({ description: 'Comentário excluído', status: 'success' })
    } catch (error) {
      toast({ description: 'Não foi possível remover o comentário', status: 'error' })
    }
  }

  return (
    <div>
      <Header />
      <Stack p={16} gap={16} alignItems="flex-start">
        <Flex gap={8}>
          <Image src={data?.image} h={300} objectFit="contain" />
          <AnimeInfo />
        </Flex>
        <Stack gap={4} w="100%">
          <Heading size="md">Comentários ({comments?.length})</Heading>
          <Flex justifyContent="space-between" as="form" gap={4} onSubmit={onSubmit}>
            <FormControl isInvalid={!!errors.comment}>
              <Input placeholder="Escrever comentário..." {...register('comment')} />
              <FormErrorMessage>{errors.comment?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="purple">
              Comentar
            </Button>
          </Flex>
          <Stack>
            {comments?.map((comment) => (
              <Tools
                disabled={userID != comment.author_id.toString()}
                key={comment.id}
                body={
                  <React.Fragment>
                    <Dialog
                      title="Excluir comentário"
                      trigger={({ open }) => (
                        <Button
                          onClick={open}
                          justifyContent="flex-start"
                          variant="ghost"
                          leftIcon={<Trash size={24} />}
                        >
                          Excluir
                        </Button>
                      )}
                      message="Tem certeza que deseja excluir esse comentário?"
                      onConfirm={() => deleteComment(comment.id)}
                    />
                  </React.Fragment>
                }
                placement="top-end"
              >
                <Stack p={4} borderRadius={8} border="1px solid #e2e8f0">
                  <Heading size="sm">{comment.author}</Heading>
                  <Text>{comment.comment}</Text>
                </Stack>
              </Tools>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </div>
  )
}
