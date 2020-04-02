import React from 'react'
import { Router, Redirect } from '@reach/router'

// components
import Orders from '@compositions/Orders'

// modules
import withSession from '../hoc/withSession'

const OrdersPages = () => (
  <Router>
    <Orders.Index path="/orders" />
    <Orders.Create path="/orders/create" />
    <Orders.Details path="/orders/:id" />

    <Redirect from="/orders/*" to="/orders" />
  </Router>
)

export default withSession(OrdersPages)
