import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { IList } from '../types/types'
import { Anime } from '../components/Anime'
import { DisplayLayout } from '../layouts/DisplayLayout'

export const ListPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data } = useFetch<IList>({ url: `/lists/${id}` })

  return (
    <DisplayLayout title={data?.name ?? 'Carregando...'}>
      {data?.animes.map((anime) => <Anime key={anime.id} disabled {...anime} />)}
    </DisplayLayout>
  )
}
