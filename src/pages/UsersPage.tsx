import { UserCard } from "../components/UserCard"
import { useFetch } from "../hooks/useFetch"
import { DisplayLayout } from "../layouts/DisplayLayout"
import { IUser } from "../types/types"

export const UsersPage = () => {

  const { data } = useFetch<IUser[]>({ url: '/users'})

  return (
    <DisplayLayout title="Usuários">
      {
        data?.map(user => (
          <UserCard key={user.id} {...user}/>
        ))
      }
    </DisplayLayout>
  )
}