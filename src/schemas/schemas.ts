import { z } from 'zod'

export const userNameSchema = z
  .string()
  .min(1, 'Campo obrigatório')
  .max(20, 'O nome precisa conter no máximo 20 caracteres')

export const emailSchema = z.string().min(1, 'Campo obrigatório').email('O email precisa ser válido')

export const passwordSchema = z
  .string()
  .min(6, 'A senha precisa conter no mínimo 8 caracteres')
  .max(20, 'A senha precisa conter no máximo 20 caracteres')

export const signUpSchema = z.object({
  name: userNameSchema,
  email: emailSchema,
  password: passwordSchema,
})

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Campo obrigatório'),
})

export const createListSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório').max(60, 'O nome precisa conter no máximo 60 caracteres'),
})

export const selectListSchema = z.object({
  list_id: z.string().min(1, 'Campo obrigatório'),
})

export const createCommentSchema = z.object({
  comment: z.string().min(1, 'Campo obrigatório').max(60, 'O comentário precisa conter no máximo 60 caracteres'),
})

export const updateProfileSchema = z.object({
  name: userNameSchema,
})

export const createAnimeSchema = z.object({
  image: z.instanceof(FileList, { message: 'Campo obrigatório' }),
  name: z.string().min(1, 'Campo obrigatório'),
  sinopsis: z.string().min(1, 'Campo obrigatório'),
})

export type ISignUp = z.infer<typeof signUpSchema>

export type ILogin = z.infer<typeof loginSchema>

export type ICreateList = z.infer<typeof createListSchema>

export type ISelectList = z.infer<typeof selectListSchema>

export type ICreateComment = z.infer<typeof createCommentSchema>

export type IUpdateProfile = z.infer<typeof updateProfileSchema>

export type ICreateAnime = z.infer<typeof createAnimeSchema>
