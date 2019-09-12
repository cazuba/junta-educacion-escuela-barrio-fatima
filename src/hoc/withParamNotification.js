import React, { useState, useEffect } from 'react'
import qs from 'qs'

// components
import Notification from '@components/Notification'

// modules
import ParamNotification from '@modules/paramNotification'
import { navigate } from 'gatsby'

export default function(WrappedComponent) {
  return function(props) {
    const [show, setShow] = useState(false)
    const { location } = props // eslint-disable-line react/prop-types
    const { search, pathname } = location || {}
    let notification = null
    if (search) {
      const params = qs.parse(search, { ignoreQueryPrefix: true })
      const { code } = params || {}
      notification = ParamNotification[code]
    }
    useEffect(() => {
      notification && setShow(true)
    }, [])
    return (
      <>
        {show && (
          <Notification
            hideOnClickAway={false}
            hideMessage={() => {
              setShow(false)
              pathname && navigate(pathname)
            }}
            {...notification}
          />
        )}
        <WrappedComponent {...props} />
      </>
    )
  }
}
