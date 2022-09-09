import React from 'react'
import { useRoutes } from 'react-router-dom'
import SuspenseWrapper from './components/ui/suspenseWrapper'
import DashboardLayout from './components/ui/dashboardLayout'
// import { useRoutes } from 'react-router-dom'
// import Dashboard from './pages/dashboard'
// import Users from './pages/users'
// import Blogs from './pages/blogs'
// import Plans from './pages/plans'
// import Payments from './pages/payments'
// import Subscription from './pages/subscriptions'
// import ErrorPage from './pages/ErrorPage'

const Dashboard = React.lazy(() => import('./pages/dashboard'))
const Users = React.lazy(() => import('./pages/users'))
const Blogs = React.lazy(() => import('./pages/blogs'))
const Plans = React.lazy(() => import('./pages/plans'))
const Payments = React.lazy(() => import('./pages/payments'))
const Subscription = React.lazy(() => import('./pages/subscriptions'))
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'))

const AllRoutes = () => {
  const routes = useRoutes([
    {
      path: '*',
      element: (
        <SuspenseWrapper>
          <ErrorPage title={'Page Not Found'} />{' '}
        </SuspenseWrapper>
      ),
    },
    {
      path: '/access-denied',
      element: <ErrorPage title={'Insufficient Permissions'} />,
    },
    {
      path: '/',
      element: (
        <DashboardLayout>
          <SuspenseWrapper>
            <Dashboard />
          </SuspenseWrapper>
        </DashboardLayout>
      ),
    },
    {
      path: '/users/*',
      element: (
        <DashboardLayout>
          <SuspenseWrapper>
            <Users />
          </SuspenseWrapper>
        </DashboardLayout>
      ),
    },
    {
      path: '/blogs/*',
      element: (
        <DashboardLayout>
          <SuspenseWrapper>
            <Blogs />
          </SuspenseWrapper>
        </DashboardLayout>
      ),
    },
    {
      path: '/plans/*',
      element: (
        <DashboardLayout>
          <SuspenseWrapper>
            <Plans />
          </SuspenseWrapper>
        </DashboardLayout>
      ),
    },
    {
      path: '/payments/*',
      element: (
        <DashboardLayout>
          <SuspenseWrapper>
            <Payments />
          </SuspenseWrapper>
        </DashboardLayout>
      ),
    },
    {
      path: '/subscriptions/*',
      element: (
        <DashboardLayout>
          <SuspenseWrapper>
            <Subscription />
          </SuspenseWrapper>
        </DashboardLayout>
      ),
    },
  ])
  return routes
}

export default AllRoutes
