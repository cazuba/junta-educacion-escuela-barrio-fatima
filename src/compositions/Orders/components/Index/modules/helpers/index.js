import Api from '@modules/api'
import { ORDERS_ENDPOINT } from "@modules/endpoints";
import {
  initialState,
  ALLOWED_PARAMS,
  STATE_FETCHING,
  STATE_ERROR,
  STATE_COMPLETED
} from "../constants";

const orders = new Api()
export default function fetchOrders(memoSearch, dispatch) {
  const params = {}
  ALLOWED_PARAMS.forEach(item => {
    if (memoSearch[item]) {
      params[item] = memoSearch[item];
    }
  })
  dispatch({
    type: STATE_FETCHING,
    payload: { filters: params, cancel: () => orders.cancelRequest() }
  })
  orders.get(ORDERS_ENDPOINT, { params }, (err, response) => {
    if (err) {
      return dispatch({ type: STATE_ERROR, payload: err })
    }
    const payload = response.data || initialState
    dispatch({ type: STATE_COMPLETED, payload })
  })
}
