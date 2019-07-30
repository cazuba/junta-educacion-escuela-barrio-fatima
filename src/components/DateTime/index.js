import React from 'react'
import { string, any, func } from 'prop-types'
import { KeyboardDatePicker } from '@material-ui/pickers'

export default function DateTime({
  className,
  label,
  name,
  defaultValue,
  value,
  format,
  ariaLabel,
  onChange,
  okLabel,
  cancelLabel,
  ...rest
}) {
  const [selectedDate, setSelectedDate] = React.useState(value || defaultValue)

  function handleDateChange(date) {
    setSelectedDate(date)
    onChange(date.format('dd/MM/yyyy'))
  }

  return (
    <KeyboardDatePicker
      className={className}
      margin="normal"
      id="mui-pickers-date"
      label={label}
      name={name}
      value={selectedDate}
      onChange={handleDateChange}
      KeyboardButtonProps={{
        'aria-label': ariaLabel
      }}
      variant="outlined"
      format={format}
      okLabel={okLabel}
      cancelLabel={cancelLabel}
      {...rest}
    />
  )
}

DateTime.propTypes = {
  label: string,
  className: string,
  name: string,
  defaultValue: any,
  value: any,
  ariaLabel: string,
  format: string,
  cancelLabel: string,
  okLabel: string,
  onChange: func
}

DateTime.defaultProps = {
  className: '',
  label: 'Date picker',
  name: '__nameless__',
  defaultValue: null,
  value: new Date(),
  ariaLabel: 'change date',
  format: 'DD/MM/YYYY',
  cancelLabel: 'Cancelar',
  okLabel: 'Aceptar',
  onChange: () => null
}
