import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme/styles.global.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router.tsx'
import { AuthContextProvider } from './contexts/AuthContext.tsx'
import { SearchContextProvider } from './contexts/SearchContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <SearchContextProvider>
          <RouterProvider router={router} />
        </SearchContextProvider>
      </ChakraProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
