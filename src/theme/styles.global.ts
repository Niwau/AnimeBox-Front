import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      'html, #root': {
        height: '100%',
      },
      body: {
        'min-height': '100%',
      },
    },
  },
})
