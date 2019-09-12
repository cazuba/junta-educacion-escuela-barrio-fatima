import React from 'react'
import { Router } from '@reach/router'

// components
import OrdersIndex from '@compositions/OrdersIndex'
import OrdersDetails from '@compositions/OrdersDetails'

// modules
import withSession from '../hoc/withSession'

const OrdersPages = () => (
  <Router>
    <OrdersIndex path="/orders" />
    <OrdersDetails path="/orders/:id" />
  </Router>
)

export default withSession(OrdersPages)
