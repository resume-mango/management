import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import AllSubscriptions from './allSubscriptions'
import SingleSubscription from './singleSubscription'

const Subscription = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<AllSubscriptions />} />
        <Route path="/:sub_id" element={<SingleSubscription />} />
      </Routes>
    </Fragment>
  )
}

export default Subscription
