import { makeStyles } from '@material-ui/core/styles'

export const useCommonStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  },
  formHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textField: {
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  description: {
    flex: 1
  },
  repetitiveGroup: {
    padding: theme.spacing(1),
    // paddingTop: theme.spacing(4),
    paddingBottom: 0,
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  recordAction: {
    marginRight: theme.spacing(1)
  }
}))
