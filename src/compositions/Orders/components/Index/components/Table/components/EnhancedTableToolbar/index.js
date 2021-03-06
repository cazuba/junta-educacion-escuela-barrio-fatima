import React from 'react'
import clsx from 'clsx'
import { number, string, node, func } from 'prop-types'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import SyncIcon from '@material-ui/icons/Sync';
// import DeleteIcon from '@material-ui/icons/Delete'
// import FilterListIcon from '@material-ui/icons/FilterList'

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
}))

const EnhancedTableToolbar = ({ numSelected, title, filters, onSync }) => {
  const classes = useToolbarStyles()
  // const [showFilters, setShowFilters] = useState(false)

  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              {title}
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Tooltip title="Sync">
            <IconButton
              aria-label="Sync"
              onClick={onSync}
            >
              <SyncIcon />
            </IconButton>
          </Tooltip>
        </div>
        {/* <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton
                aria-label="Filter list"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div> */}
      </Toolbar>
      {/* {showFilters && (
        <Toolbar className={classes.root}>
          <div className={classes.title}>{filters}</div>
        </Toolbar>
      )} */}
    </>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: number.isRequired,
  title: string.isRequired,
  filters: node,
  onSync: func
}
EnhancedTableToolbar.defaultProps = {
  filters: null,
  onSync: () => null
}

export default EnhancedTableToolbar
