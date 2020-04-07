import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import { node, bool, array } from 'prop-types'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/dayjs'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'

const Content = ({ showBreadcrumbs, breadcrumbs, children }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Grid container direction="column">
      {showBreadcrumbs && (
        <Grid item>
          <Box mt={2} displayPrint="none">
            <Breadcrumbs aria-label="Breadcrumb">
              {breadcrumbs.map((item, index) => (
                <Fragment key={index}>
                  {index < breadcrumbs.length - 1 ? (
                    <Link color="inherit" to={item.url}>
                      {item.text}
                    </Link>
                  ) : (
                    <Typography color="textPrimary">{item.text}</Typography>
                  )}
                </Fragment>
              ))}
            </Breadcrumbs>
          </Box>
        </Grid>
      )}
      <Grid item>{children}</Grid>
    </Grid>
  </MuiPickersUtilsProvider>
)

Content.propTypes = {
  children: node.isRequired,
  showBreadcrumbs: bool,
  breadcrumbs: array
}

Content.defaultProps = {
  showBreadcrumbs: true,
  breadcrumbs: []
}

export default Content
