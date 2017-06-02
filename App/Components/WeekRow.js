import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/WeekRowStyle'
import DayCell from './DayCell'

export default class WeekRow extends React.Component {

  render () {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const { weekData } = this.props
    console.log('weekData', weekData.vDays)
    return (
      <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
        {
          days.map((day, i) => {
            const date = new Date(new Date(weekData.sDate).getTime()+i*24*3600*1000)
            const vDays = weekData.vDays.filter(vday => (vday.date === date.toJSON())) || []
            const type = (vDays.length>0) ? vDays[0].type : 'none'
            return (<DayCell day={day} key={day} type={type} date={date} />)
          })
        }
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
