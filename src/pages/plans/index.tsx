import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import AllPlans from './allPlans'
import Plan from './plan'

const Plans = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<AllPlans />} />
        <Route path={'/:id'} element={<Plan />} />
      </Routes>
    </Fragment>
  )
}

export default Plans
