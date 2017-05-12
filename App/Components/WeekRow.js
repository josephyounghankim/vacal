import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/WeekRowStyle'
import DayCell from './DayCell'

export default class WeekRow extends React.Component {

  render () {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    return (
      <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
        {days.map(day => (<DayCell day={day} key={day} />))}
      </View>
    )
  }
}

// // Prop type warnings
// WeekRow.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// WeekRow.defaultProps = {
//   someSetting: false
// }
