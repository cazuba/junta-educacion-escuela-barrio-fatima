import React from 'react'

// components
import Layout from '@components/Layout'
import SEO from '@components/Seo'
import EnhancedTable from '@components/EnhancedTable'

const breadcrumbs = [
  { url: '/welcome', text: 'Inicio' },
  { url: '/orders', text: 'Orders' }
]

const OrdersIndex = () => (
  <Layout breadcrumbs={breadcrumbs}>
    <SEO title="Orders" />
    <EnhancedTable
      title="Orders"
      rows={[]}
      rowsPerPage={5}
      onFiltersChange={() => null}
      headers={[
        {
          id: 'id',
          numeric: false,
          disablePadding: true,
          label: 'N. Orden'
        },
        { id: 'name', numeric: false, disablePadding: false, label: 'R.Social' },
        {
          id: 'condition',
          numeric: false,
          disablePadding: false,
          label: 'Condición'
        },
        { id: 'buyDate', numeric: false, disablePadding: false, label: 'Fech. Compra' },
        { id: 'actions', numeric: false, disablePadding: true, label: 'Actions' }
      ]}
      // noResults={}
      // filters={
      //   <Paper className={classes.searchPaper}>
      //     <InputBase
      //       className={classes.input}
      //       onChange={event =>
      //         handleSearch(event.currentTarget.value)
      //       }
      //       placeholder="Search"
      //       inputProps={{
      //         'aria-label': 'search users',
      //         defaultValue: search
      //       }}
      //     />
      //     <IconButton
      //       className={classes.iconButton}
      //       aria-label="search"
      //     >
      //       <SearchIcon />
      //     </IconButton>
      //   </Paper>
      // }
    />
  </Layout>
)

export default OrdersIndex
