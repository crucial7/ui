export const REQUEST_FORECASTS = 'REQUEST_FORECASTS'
export const RECEIVE_FORECASTS = 'RECEIVE_FORECASTS'
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION'
export const SELECT_ADDRESS = 'SELECT_ADDRESS'
export const INVALIDATE_FORECAST = 'INVALIDATE_FORECAST'

export const selectAddress = address => ({
  type: SELECT_ADDRESS,
  address
})

export const invalidateForecast = address => ({
  type: INVALIDATE_FORECAST,
  address
})

export const requestForecast = address => ({
  type: REQUEST_FORECASTS,
  address
})

export const receiveForecast = (address, json) => ({
  type: RECEIVE_FORECASTS,
  address,
  forecasts: json,
  receivedAt: Date.now()
})

export const receiveLocation = (address, json) => ({
  type: RECEIVE_LOCATION,
  address,
  foundAddress: json.Address
})

export const setPosition = (lat, long) => dispatch => {
    let address = 'Current Location'
    dispatch(selectAddress(address))
    return fetch(`http://proxy.sheriff.io/weather/${lat}/${long}/${Math.round((new Date()).valueOf()/1000)}`)
      .then(response => response.json())
      .then(json => {
          console.log('setPosweather:', json);
          console.log('setPosaddress:', address);
          dispatch(receiveForecast(address, json))
      })
}

const fetchForecasts = address => dispatch => {
    dispatch(requestForecast(address))
    return fetch(`http://proxy.sheriff.io/latlong/${address}`)
      .then(response => response.json())
      .then(json => {
          console.log('latlong:', json);
          dispatch(receiveLocation(address, json))
        return fetch(`http://proxy.sheriff.io/weather/${json.Lat}/${json.Long}/${Math.round((new Date()).valueOf()/1000)}`)
          .then(response => response.json())
          .then(json => {
              console.log('weather:', json);
              console.log('address:', address);
              dispatch(receiveForecast(address, json))
          })
      })
}

const shouldFetchForecasts = (state, address) => {
  const forecasts = state.forecastsViaApi[address]
  if (!forecasts) {
    return true
  }
  if (forecasts.isFetching) {
    return false
  }
  return forecasts.didInvalidate
}

export const fetchForecastsIfNeeded = address => (dispatch, getState) => {
  if (shouldFetchForecasts(getState(), address)) {
    return dispatch(fetchForecasts(address))
  }
}
