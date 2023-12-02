import { Box, HStack, Heading } from '@chakra-ui/react'
import { Header } from '../components/Header'
import React from 'react'

interface DisplayLayoutProps {
  children: React.ReactNode
  title: string
  action?: React.ReactNode
}

export const DisplayLayout = ({ title, action, children }: DisplayLayoutProps) => {
  return (
    <React.Fragment>
      <Header />
      <Box padding={16}>
        <HStack justifyContent="space-between">
          <Heading>{title}</Heading>
          {action}
        </HStack>
        <HStack gap={8} mt={16} wrap='wrap'>
          {children}
        </HStack>
      </Box>
    </React.Fragment>
  )
}
