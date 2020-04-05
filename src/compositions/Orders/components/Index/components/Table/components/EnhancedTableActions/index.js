import React from 'react'
import { string } from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility'

// modules
import Router from '@modules/router'

const EDIT_ORDER_BASE_URL = '/orders/:id'

const EnhancedTableActions = ({
  id,
  editUrl: editParamUrl
}) => {
  const editUrl = editParamUrl.replace(/:id/g, id)
  return (
    <div style={{ display: 'flex', alignItems: 'space-around' }}>
      <Tooltip title="View Order">
        <IconButton aria-label="View Order" onClick={() => Router.go(editUrl)}>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}

EnhancedTableActions.propTypes = {
  id: string.isRequired,
  editUrl: string
}

EnhancedTableActions.defaultProps = {
  editUrl: EDIT_ORDER_BASE_URL
}

export default EnhancedTableActions
