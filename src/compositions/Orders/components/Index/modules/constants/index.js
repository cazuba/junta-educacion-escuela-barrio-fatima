export const BREADCRUMBS = [
  { url: '/welcome', text: 'Inicio' },
  { url: '/orders', text: 'Orders' }
]

export const STATE_INIT = 'initialize'
export const STATE_FETCHING = 'fetching'
export const STATE_CANCELLING = 'cancelling'
export const STATE_COMPLETED = 'completed'
export const STATE_ERROR = 'failed'
export const STATE_EXITING = 'closed'

export const initialState = {
  cancel: () => null,
  refetch: () => null,
  loading: true,
  cancelled: false,
  error: null,
  meta: { rowsPerPage: 5, page: 1 },
  results: []
}

export const ALLOWED_PARAMS = ['rowsPerPage', 'page']