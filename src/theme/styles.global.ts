import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      'html, #root, body': {
        height: '100%',
      },
      body: {
        'min-height': '100%',
      },
    },
  },
})
