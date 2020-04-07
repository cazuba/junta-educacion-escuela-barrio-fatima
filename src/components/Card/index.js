import React, { memo } from 'react'
import clsx from 'clsx'
import { func, node, oneOf } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    width: '100%',
    '&:before': {
      content: '\'\'',
      display: 'flex'
    }
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  error: {
    '&:before': {
      border: `2px solid ${theme.palette.error.main}`
    }
  },
  loading: {
    '&:before': {
      border: `2px solid ${theme.palette.primary.main}`
    }
  },
  title: {
    marginBottom: 12
  }
}))
  
export const ERROR_CARD = 'error'
export const LOADING_CARD = 'loading'

const CustomCard = memo(({ type, message, linkMessage, onClick }) => {
  const classes = useStyles()
  return (
    <Card className={clsx(classes.root, classes[type])}>
      <div className={classes.cardContent}>
        <CardContent>
          <Typography className={classes.title} variant="h6" component="h2">
            {message}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={onClick} size="small">{linkMessage}</Button>
        </CardActions>
      </div>
    </Card>
    )
})

CustomCard.propTypes = {
  type: oneOf([ERROR_CARD, LOADING_CARD]).isRequired,
  message: node.isRequired,
  linkMessage: node.isRequired,
  onClick: func
}

CustomCard.defaultProps = {
    onClick: () => null
}

export default CustomCard;