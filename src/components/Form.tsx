import { FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, DefaultValues, FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { ZodSchema } from 'zod' 

interface FormProps<T extends FieldValues> {
  header?: React.ReactNode
  structure: FormStructure<T>
  footer?: React.ReactNode
  onSubmit: (data: T, utils: FormUtils<T>) => void | Promise<void>
}

interface Input<T> {
  name: Path<T>
  label: string
  type?: string
  placeholder?: string
}

export interface FormStructure<T> {
  defaultValues: DefaultValues<T>
  inputs: Input<T>[]
  schema: ZodSchema
}

export interface FormUtils<T extends FieldValues> {
  setError: UseFormSetError<T>
}

export const Form = <T extends FieldValues>({ structure, header, footer, ...form }: FormProps<T>) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: structure.defaultValues,
    resolver: zodResolver(structure.schema),
  })

  const onSubmit = handleSubmit(async (data) => {
    await form.onSubmit(data, { setError })
  })

  return (
    <Stack as="form" gap="8px" flex={1} onSubmit={onSubmit}>
      {header}
      {structure.inputs.map((input, index) => (
        <FormControl key={index} isInvalid={!!errors[input.name]}>
          <FormLabel>{input.label}</FormLabel>
          <Input placeholder={input.placeholder} type={input.type} {...register(input.name)} />
          <FormErrorMessage>{errors[input.name]?.message as string}</FormErrorMessage>
        </FormControl>
      ))}
      {footer}
    </Stack>
  )
}
