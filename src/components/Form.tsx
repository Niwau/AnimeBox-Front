import { FormControl, FormErrorMessage, FormLabel, Input, InputProps, Select, Stack, Textarea, BoxProps } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, DefaultValues, FieldValues, Path, UseFormSetError, UseFormResetField } from 'react-hook-form'
import { ZodSchema } from 'zod'

interface FormProps<T extends FieldValues> {
  header?: React.ReactNode
  structure: FormStructure<T>
  footer?: React.ReactNode
  onSubmit: (data: T, utils: FormUtils<T>) => void | Promise<void>
  containerProps?: BoxProps
}

interface Input<T> extends InputProps {
  name: Path<T>
  label: string
  type?: string
  placeholder?: string
  render?: 'select' | 'textarea'
  options?: FormOption[]
}

export interface FormStructure<T> {
  defaultValues: DefaultValues<T>
  inputs: Input<T>[]
  schema: ZodSchema
}

export interface FormUtils<T extends FieldValues> {
  setError: UseFormSetError<T>
  resetField: UseFormResetField<T>
}

interface FormOption {
  value: string
  label: string | number
}

export const Form = <T extends FieldValues>({ structure, header, footer, containerProps, ...form }: FormProps<T>) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    resetField,
  } = useForm({
    defaultValues: structure.defaultValues,
    resolver: zodResolver(structure.schema),
  })

  const onSubmit = handleSubmit(async (data) => {
    await form.onSubmit(data, { setError, resetField })
  })

  return (
    <Stack as="form" gap="8px" flex={1} onSubmit={onSubmit} {...containerProps}>
      {header}
      {structure.inputs.map((input, index) => (
        <FormControl key={index} isInvalid={!!errors[input.name]}>
          <FormLabel>{input.label}</FormLabel>
          {input?.render == 'select' ? (
            <Select placeholder={input.placeholder} {...register(input.name)}>
              {input.options?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          ) : input?.render == 'textarea' ? (
            <Textarea {...register(input.name)}/>
          ) : (
            <Input {...input} {...register(input.name)} />
          )}
          <FormErrorMessage>{errors[input.name]?.message as string}</FormErrorMessage>
        </FormControl>
      ))}
      {footer}
    </Stack>
  )
}
