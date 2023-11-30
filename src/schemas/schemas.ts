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

export type ISignUp = z.infer<typeof signUpSchema>

export type ILogin = z.infer<typeof loginSchema>

export type ICreateList = z.infer<typeof createListSchema>