import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'
import { Theme } from '../styled/theme'
import React, { ReactNode } from 'react'
import { ViewportProvider } from '../contexts/viewPort'
import { GlobalStyles } from '../styled/global'
import { NotifyProvider } from '../contexts/notify'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const TestingWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ViewportProvider>
          <ThemeProvider theme={Theme}>
            <GlobalStyles />
            <NotifyProvider>{children}</NotifyProvider>
          </ThemeProvider>
        </ViewportProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
export default TestingWrapper
