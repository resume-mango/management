import React, { Fragment } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AllUsers from './allUsers'
import SingleUser from './user'

const Users = () => {
  const { pathname } = useLocation()

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<AllUsers />} />
        <Route
          path="/:user_id"
          element={<Navigate to={pathname + '/details'} replace />}
        />
        <Route path="/:user_id/:type" element={<SingleUser />} />
      </Routes>
    </Fragment>
  )
}

export default Users
