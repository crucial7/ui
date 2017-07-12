import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectAddress, fetchForecastsIfNeeded, setPosition } from '../actions'
import Forecasts from '../components/Forecasts'

class App extends Component {
  static propTypes = {
    enteredAddress: PropTypes.string.isRequired,
    forecasts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    foundAddress: PropTypes.string.isRequired
  }

  // componentWillMount() {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     let {latitude, longitude} = position.coords
  //     console.log('lat/long', latitude, longitude)
  //     const { dispatch } = this.props
  //     dispatch(setPosition(latitude, longitude))
  //   }, () => {
  //
  //     console.log('Unable to find geo-position')
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.enteredAddress !== this.props.enteredAddress) {
      const { dispatch, enteredAddress } = nextProps
      dispatch(fetchForecastsIfNeeded(enteredAddress))
    }
  }

  handleChange = nextAddress => {
    this.props.dispatch(selectAddress(nextAddress))
  }

  handleKeyPress = e => {
     if (e.charCode === 13) {

         this.props.dispatch(selectAddress(document.getElementById('address').value))
     }
  }

  handleAddressEntered = e => {
    e.preventDefault()

    this.props.dispatch(selectAddress(document.getElementById('address').value))
  }

  render() {
    const { forecasts, isFetching, foundAddress } = this.props
    const isEmpty = forecasts.length === 0
    return (
      <div>
          <br />
          <div className="form-group">
              <input placeholder='Arcus is awesome...' className="form-control" id='address' tabIndex='1' onKeyPress={this.handleKeyPress} />
              <br />
              <h4 id='renderedAddress'>{foundAddress === '' ? ' ' : foundAddress}</h4>
              <br />
              <button tabIndex='2' className="btn btn-primary" onClick={this.handleAddressEntered}>Submit</button>
          </div>

          {isEmpty
              ? (isFetching ? <img alt='loading' src='images/loading.gif'/> : <h2> </h2>)
              : <Forecasts forecasts={forecasts} />
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { enteredAddress, forecastsViaApi } = state
  const {
    isFetching,
    lastUpdated,
    items: forecasts,
    foundAddress
  } = forecastsViaApi[enteredAddress] || {
    isFetching: '',
    items: []
  }

  return {
    enteredAddress,
    forecasts,
    isFetching,
    lastUpdated,
    foundAddress
  }
}

export default connect(mapStateToProps)(App)
