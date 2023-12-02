import { createContext, useState, useContext } from 'react'
import { Children } from '../types/types'

interface ISearchContext {
  search: string
  setSearch: (search: string) => void
}

export const SearchContext = createContext<ISearchContext>({} as ISearchContext)

export const SearchContextProvider = ({ children }: Children) => {
  const [search, setSearch] = useState('')
  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>
}

export const useSearchContext = () => {
  return useContext(SearchContext)
}
