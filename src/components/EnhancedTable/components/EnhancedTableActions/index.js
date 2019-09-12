import React from 'react'
import { string, func } from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Create'
import PasswordIcon from '@material-ui/icons/VpnKey'
import DeleteIcon from '@material-ui/icons/Delete'
import { navigate } from 'gatsby';

const CHANGE_PASSWORD_BASE_URL = '/users/id/security'
const EDIT_PROFILE_BASE_URL = '/users/id/general'

const EnhancedTableActions = ({
  id,
  changePasswordUrl: changePassParamUrl,
  editUrl: editParamUrl,
  onDelete
}) => {
  const changePasswordUrl = changePassParamUrl.replace(/id/g, id)
  const editUrl = editParamUrl.replace(/id/g, id)
  return (
    <div style={{ display: 'flex', alignItems: 'space-around' }}>
      <Tooltip title="Change Password" onClick={() => navigate(changePasswordUrl)}>
        <IconButton aria-label="Delete">
          <PasswordIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit Profile">
        <IconButton aria-label="Delete" onClick={() => navigate(editUrl)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Account">
        <IconButton aria-label="Delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}

EnhancedTableActions.propTypes = {
  id: string.isRequired,
  changePasswordUrl: string,
  editUrl: string,
  onDelete: func
}

EnhancedTableActions.defaultProps = {
  changePasswordUrl: CHANGE_PASSWORD_BASE_URL,
  editUrl: EDIT_PROFILE_BASE_URL,
  onDelete: () => null
}

export default EnhancedTableActions
