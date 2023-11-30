/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { api } from '../services/api'
import { useToast } from '@chakra-ui/react'

interface useFetchProps {
  url: string
}

export const useFetch = <T>({ url }: useFetchProps) => {
  const [data, setData] = useState<T | null>(null)
  const toast = useToast()

  const refetch = async () => {
    try {
      const response = await api.get<T>(url)
      setData(response.data)
    } catch (error) {
      toast({ title: 'Erro', description: 'Erro ao carregar os dados', status: 'error' })
    }
  }

  useEffect(() => {
    const fetcher = async () => {
      await refetch()
    }
    fetcher()
    return () => setData(null)
  }, [])

  return { data, setData, refetch }
}
