import React from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import styles from './Styles/DayCellStyle'
import moment from 'moment'

export default class DayCell extends React.Component {
  handlePress  = event => {
    this.props.handlePress(this.props.date)
  }

  render () {
    const date = moment(this.props.date).format('MM/DD')
    return (
      <TouchableOpacity style={[styles.container, styles[this.props.type + 'day']]} onPress={this.handlePress}>
      <Text style={[{color:'black', textAlign:'center'}, styles[this.props.day.toLowerCase() + 'dayText']]}>{this.props.day} {date}</Text>
      </TouchableOpacity>
    )
    /*
    return (this.props.day == 'Sun') ?
        (
          <TouchableOpacity style={styles.container} onPress={this.handlePress}>
          <Text style={{color:'black', textAlign:'center'}}>{this.props.day} {date}</Text>
          </TouchableOpacity>
        ) :
        (
          <TouchableHighlight style={styles.container} onPress={this.handlePress}>
          <Text style={{color:'black', textAlign:'center'}}>{this.props.day} {date}</Text>
          </TouchableHighlight>
        )
    */
  }
}

// // Prop type warnings
// DayCell.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// DayCell.defaultProps = {
//   someSetting: false
// }
