import React, { useState } from 'react'
import { array, number, func, string, node } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import EnhancedTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

// components
import EnhancedTableToolbar from './components/EnhancedTableToolbar'
import EnhancedTableHead from './components/EnhancedTableHead'
import EnhancedTableActions from './components/EnhancedTableActions'

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy)
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto'
  }
}))

export default function Table ({
  rows,
  rowsPerPage,
  title,
  filters,
  noResults,
  headers,
  onFiltersChange,
  onSync
}) {
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('username')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  function handleChangePage(_, newPage) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage(event) {
    onFiltersChange({ rowsPerPage: +event.target.value })
  }

  function handleChangeDense(event) {
    setDense(event.target.checked)
  }

  const isSelected = id => selected.indexOf(id) !== -1

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          onSync={onSync}
          numSelected={selected.length}
          title={title}
          filters={filters}
        />
        <div className={classes.tableWrapper}>
          <EnhancedTable
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              headers={headers}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.length > 0 ? (
                stableSort(rows, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                        >
                          {row.orderNumber}
                        </TableCell>
                        <TableCell align="left">{row.socialName}</TableCell>
                        <TableCell align="left">{row.condition}</TableCell>
                        <TableCell align="left">{row.boughtDate}</TableCell>
                        <TableCell align="right">
                          <EnhancedTableActions id={row._id} />
                        </TableCell>
                      </TableRow>
                    )
                  })
              ) : (
                <TableRow
                  style={{
                    height: (dense ? 49 : 69) * emptyRows
                  }}
                >
                  <TableCell colSpan={7}>
                    <Typography align="center" color="textSecondary" variant="subtitle2">
                      {noResults}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && rows.length > 0 && (
                <TableRow style={{ height: (dense ? 49 : 69) * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </EnhancedTable>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  )
}

Table.propTypes = {
  headers: array.isRequired,
  rows: array,
  rowsPerPage: number,
  title: string,
  filters: node,
  noResults: string,
  onFiltersChange: func,
  onSync: func
}

Table.defaultProps = {
  rows: [],
  rowsPerPage: 5,
  title: '',
  filters: null,
  noResults: 'No results',
  onFiltersChange: () => null,
  onSync: () => null
}
