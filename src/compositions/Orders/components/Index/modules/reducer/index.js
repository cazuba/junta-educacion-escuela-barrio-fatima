import {
    initialState,
    STATE_INIT,
    STATE_FETCHING,
    STATE_COMPLETED,
    STATE_ERROR,
    STATE_CANCELLING,
    STATE_EXITING
  } from "../constants";

export default function reducer(state, action) {
  switch (action.type) {
    case STATE_INIT:
    return { ...initialState, ...state, refetch: action.payload }
    case STATE_FETCHING:
    const { filters, cancel } = action.payload || {}
    return { ...initialState, ...state, cancelled: false, error: null, loading: true, cancel, meta: { ...initialState.meta, ...state.meta, ...filters } }
    case STATE_COMPLETED:
    const { meta, results } = action.payload
    return { ...initialState, ...state, cancelled: false, loading: false, meta, results }
    case STATE_ERROR:
    return { ...initialState, ...state, loading: false, error: action.payload }
    case STATE_CANCELLING:
    state.cancel()
    return { ...initialState, ...state , cancelled: true }
    case STATE_EXITING:
    state.cancel()
    return state
    default:
    throw new Error('Unknown error')
  }
}