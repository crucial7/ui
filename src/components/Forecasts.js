import React from 'react'
import PropTypes from 'prop-types'
import Skycons from 'react-skycons'

const Forecasts = ({forecasts}) => (
  <div className='forecast-detail'>
    {forecasts.map((forecast, i) =>
      <div key={'div_' + i} className='detail'>
        <h4 key={'h4_'+i}>{
            (new Date(forecast.currently.time * 1000).getMonth() + 1).toString() + '/' +
            new Date(forecast.currently.time * 1000).getDate().toString() + '/' +
            new Date(forecast.currently.time * 1000).getFullYear().toString()
        }</h4>
        <Skycons key={'skycons_' + i} color='black' icon={forecast.currently.icon.toUpperCase().replace(/-/g, '_')} />
        <h3 key={'h3_'+i}>{forecast.currently.apparentTemperature}°F</h3>
        <h4 key={'summary_h4_'+i}>{forecast.currently.summary}</h4>
      </div>
    )}
  </div>
)

Forecasts.propTypes = {
  forecasts: PropTypes.array.isRequired
}

export default Forecasts
