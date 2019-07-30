import React from 'react'

// components
import Layout from '@components/Layout'
import SEO from '@components/Seo'
import Table from './components/Table'

const breadcrumbs = [
  { url: '/welcome', text: 'Inicio' },
  { url: '/orders', text: 'Orders' }
]

const OrdersList = () => (
  <Layout breadcrumbs={breadcrumbs}>
    <SEO title="Orders" />
    <Table />
  </Layout>
)

export default OrdersList
