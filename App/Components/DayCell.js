import React from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import styles from './Styles/DayCellStyle'

export default class DayCell extends React.Component {
  handlePress = event => {}
  render () {
    return (this.props.day == 'Sun') ?
        (
          <TouchableOpacity style={styles.container} onPress={this.handlePress}>
          <Text style={{color:'black', textAlign:'center'}}>{this.props.day}</Text>
          </TouchableOpacity>
        ) :
        (
          <TouchableHighlight style={styles.container} onPress={this.handlePress}>
          <Text style={{color:'black', textAlign:'center'}}>{this.props.day}</Text>
          </TouchableHighlight>
        )
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
