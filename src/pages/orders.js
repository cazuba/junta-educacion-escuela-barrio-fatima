import React from 'react'
import { Router } from '@reach/router'

// components
import OrdersList from '@compositions/OrdersList'
import OrderDetails from '@compositions/OrderDetails'

const LeadsPage = () => (
  <Router>
    <OrdersList path="/orders" />
    <OrderDetails path="/orders/:id" />
  </Router>
)

export default LeadsPage
