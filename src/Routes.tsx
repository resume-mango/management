import React, { Fragment } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import SuspenseWrapper from './components/ui/suspenseWrapper'
import DashboardLayout from './components/ui/dashboardLayout'
import { useViewport } from './contexts/viewPort'
import NotSupported from './pages/NotSupported'
import { useAuth } from './contexts/authProvider'
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
const ReviewList = React.lazy(() => import('./pages/resume-review/ReviewList'))
const ReviewChat = React.lazy(() => import('./pages/resume-review/ReviewChat'))

const ErrorPage = React.lazy(() => import('./pages/ErrorPage'))

const AllRoutes = () => {
  const { width } = useViewport()
  const { user } = useAuth()

  const notFound = {
    path: '*',
    element: (
      <SuspenseWrapper>
        <ErrorPage title={'Page Not Found'} />{' '}
      </SuspenseWrapper>
    ),
  }
  const accessDenied = {
    path: '/access-denied',
    element: (
      <SuspenseWrapper>
        <ErrorPage title={'Insufficient Permissions'} />,
      </SuspenseWrapper>
    ),
  }

  const routes = useRoutes(
    !user ||
      !user.role ||
      user.role.length === 0 ||
      (user &&
      user.role &&
      !['admin', 'reviewer'].some((r) => user.role.includes(r))
        ? []
        : user.role.includes('admin'))
      ? [
          notFound,
          accessDenied,
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
          {
            path: '/resume-review',
            element: (
              <DashboardLayout>
                <SuspenseWrapper>
                  <ReviewList />
                </SuspenseWrapper>
              </DashboardLayout>
            ),
          },
          {
            path: '/resume-review/:ticket',
            element: (
              <SuspenseWrapper>
                <ReviewChat />
              </SuspenseWrapper>
            ),
          },
        ]
      : [
          notFound,
          accessDenied,
          {
            path: '/',
            element: <Navigate to="/resume-review" replace />,
          },
          {
            path: '/resume-review',
            element: (
              <DashboardLayout>
                <SuspenseWrapper>
                  <ReviewList />
                </SuspenseWrapper>
              </DashboardLayout>
            ),
          },
          {
            path: '/resume-review/:ticket',
            element: (
              <SuspenseWrapper>
                <ReviewChat />
              </SuspenseWrapper>
            ),
          },
        ]
  )
  return <Fragment>{width <= 1025 ? <NotSupported /> : routes}</Fragment>
}

export default AllRoutes
