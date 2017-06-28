import { combineReducers } from 'redux'
import {
  SELECT_ADDRESS, INVALIDATE_FORECAST,
  REQUEST_FORECASTS, RECEIVE_FORECASTS,
  RECEIVE_LOCATION
} from '../actions'

const enteredAddress = (state = '', action) => {
  switch (action.type) {
    case SELECT_ADDRESS:
      return action.address
    default:
      return state
  }
}

const forecasts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  foundAddress: ''
}, action) => {
  switch (action.type) {
    case INVALIDATE_FORECAST:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_FORECASTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_FORECASTS:
        console.log('state', state);
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.forecasts,
        lastUpdated: action.receivedAt,
        foundAddress: state.foundAddress
      }
    case RECEIVE_LOCATION:
      return {
        ...state,
        foundAddress: action.foundAddress
      }
    default:
      return state
  }
}

const forecastsViaApi = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_FORECAST:
    case RECEIVE_FORECASTS:
    case RECEIVE_LOCATION:
    case REQUEST_FORECASTS:
      return {
        ...state,
        [action.address]: forecasts(state[action.address], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  forecastsViaApi,
  enteredAddress
})

export default rootReducer
