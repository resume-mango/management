import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GlobalStyles } from './styled/global'
import { Theme } from './styled/theme'
import { ViewportProvider } from './contexts/viewPort'
import { NotifyProvider } from './contexts/notify'
import { ReactQueryDevtools } from 'react-query/devtools'
import './public/fonts/style.css'
import { useAuth } from './contexts/authProvider'
import { Spinner } from './styled/loader'
import DashboardLayout from './components/ui/dashboardLayout'
import { useRoutes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Users from './pages/users'
import Blogs from './pages/blogs'
import Plans from './pages/plans'
import Payments from './pages/payments'
import Subscription from './pages/subscriptions'
import ErrorPage from './pages/ErrorPage'
import Cookies from 'universal-cookie'

const twentyFourHoursInMs = 1000 * 60 * 60 * 24
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 2,
      staleTime: twentyFourHoursInMs,
    },
  },
})

// export const history = createBrowserHistory()

// export interface Cypresswindow extends Window {
//   Cypress: any
//   tgHistory: any
// }
// declare let window: Cypresswindow

// if (window.Cypress) {
//   console.log('hit')
//   window.tgHistory = window.history
// }
const cookie = new Cookies()

const App = () => {
  const XSRFToken = cookie.get('XSRF-TOKEN')
  const [csrf, setCsrf] = useState(XSRFToken)

  axios.defaults.baseURL = `${process.env.API_HOST}/v1`
  axios.defaults.withCredentials = true
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf

  useEffect(() => {
    if (!XSRFToken) return
    setCsrf(XSRFToken)
  }, [XSRFToken])

  axios.interceptors.response.use(
    (res) => res,
    (error) => {
      // error.response && console.log(error.response)

      if (
        error.response &&
        error.response.status &&
        error.response.status === 403
      ) {
        window.location.replace('/access-denied')
      }
    }
  )

  const { isLoading, token } = useAuth()

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ViewportProvider>
          <ThemeProvider theme={Theme}>
            <GlobalStyles />
            <NotifyProvider>
              {isLoading ? (
                <div className="align-center">
                  <Spinner size="2.5rem" type="primary" className="mb-1" />
                </div>
              ) : (
                <Fragment>
                  <AllRoutes />
                </Fragment>
              )}
            </NotifyProvider>
          </ThemeProvider>
        </ViewportProvider>
      </QueryClientProvider>
    </Fragment>
  )
}

export default App

const AllRoutes = () => {
  const routes = useRoutes([
    {
      path: '*',
      element: <ErrorPage title={'Page Not Found'} />,
    },
    {
      path: '/access-denied',
      element: <ErrorPage title={'Insufficient Permissions'} />,
    },
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      ),
    },
    {
      path: '/users/*',
      element: (
        <DashboardLayout>
          <Users />
        </DashboardLayout>
      ),
    },
    {
      path: '/blogs/*',
      element: (
        <DashboardLayout>
          <Blogs />
        </DashboardLayout>
      ),
    },
    {
      path: '/plans/*',
      element: (
        <DashboardLayout>
          <Plans />{' '}
        </DashboardLayout>
      ),
    },
    {
      path: '/payments/*',
      element: (
        <DashboardLayout>
          <Payments />
        </DashboardLayout>
      ),
    },
    {
      path: '/subscriptions/*',
      element: (
        <DashboardLayout>
          <Subscription />{' '}
        </DashboardLayout>
      ),
    },
  ])
  return routes
}
