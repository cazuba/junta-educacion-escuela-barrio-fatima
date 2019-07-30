import React from 'react'
import { string } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  progress: {
    marginRight: theme.spacing(2),
    width: '50px',
    zIndex: '200'
  }
}))

const Loader = ({ color }) => {
  const styled = useStyles()

  return <CircularProgress className={styled.progress} color={color} />
}

Loader.propTypes = {
  color: string
}

Loader.defaultProps = {
  color: 'secondary'
}

export default Loader
