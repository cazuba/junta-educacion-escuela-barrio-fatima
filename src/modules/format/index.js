export const PERCENTAGE = 'percentage'
export const FIXED = 'fixed'
export const ROUND = 'round'
export const CURRENCY = 'currency'
export const GROUP_DIGITS = 'groupDigits'
export const MONEY = 'money'

const defaultOpts = {
  type: [CURRENCY],
  decimals: 2,
  includeSymbol: true,
  lang: 'es-CR',
  format: { style: 'currency', currency: 'CRC' }
}

const CONVERSIONS = [
  {
    symbol: 'T',
    rate: 1000000000000
  },
  {
    symbol: 'B',
    rate: 1000000000
  },
  {
    symbol: 'M',
    rate: 1000000
  },
  {
    symbol: 'K',
    rate: 1000
  }
]

const toCurrency = (amount, config = { includeSymbol: true }) => {
  let format = null
  CONVERSIONS.forEach(conversion => {
    if (format) return format
    let tmp = amount / conversion.rate
    if (Math.round(tmp) > 0) {
      tmp = parseFloat(tmp).toFixed(2)
      format = `${tmp} ${config.includeSymbol ? conversion.symbol : ''}`
      return format
    }
    return false
  })
  if (!format) {
    format = parseFloat(amount).toFixed(2)
  }
  return format
}

const toFixed = (amount, config = { decimals: 2 }) =>
  parseFloat(amount).toFixed(config.decimals)

const toPercentage = (amount, config) => {
  const format = toFixed(amount, config)
  return `${format}%`
}

const toGroupDigits = (amount, config) => {
  let value = toFixed(amount, config)
  return value.replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

const toMoney = (
  amount,
  config = { lang: 'es-CR', format: { style: 'currency', currency: 'CRC' } }
) => new Intl.NumberFormat(config.lang, config.format).format(amount)

const useFormat = (amount, opts) => {
  let config = { ...defaultOpts }
  if (typeof opts === 'string') {
    config['type'] = opts
  } else {
    config = { ...config, ...opts }
  }
  const { type } = config
  let formattedValue = amount
  switch (type) {
    case PERCENTAGE:
      formattedValue = toPercentage(amount)
      break
    case ROUND:
      formattedValue = Math.round(amount)
      break
    case FIXED:
      formattedValue = toFixed(amount, config)
      break
    case GROUP_DIGITS:
      if (!amount) return 0
      formattedValue = toGroupDigits(amount, config)
      break
    case MONEY:
      formattedValue = toMoney(amount, config)
      break
    case CURRENCY:
    default:
      if (!amount) return 0
      formattedValue = toCurrency(amount, config)
      break
  }
  return formattedValue
}

export default useFormat
