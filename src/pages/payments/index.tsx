import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import AllPayments from './allPayments'
import SinglePayment from './singlePayments'

const Payments = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<AllPayments />} />
        <Route path="/:payment_id" element={<SinglePayment />} />
      </Routes>
    </Fragment>
  )
}

export default Payments
