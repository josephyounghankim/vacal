import React from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import styles from './Styles/DateInputStyle'

export default class DateInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: props.date.substr(0,10),  // 2016-09-14
      orgDate: props.date.substr(0,10),  // 2016-09-14
      isEditing: false
    }
  }
  onChangeText = (text) => {
    this.setState({date:text})
  }
  onEdit = () => {
    this.setState({isEditing:true})
  }
  onSave = () => {
    const date = this.state.date
    if (date.length === 10) {
      const d = new Date(date).getTime()
      if (d >= new Date('2015').getTime() && d < new Date('2050').getTime()) {
        this.setState({orgDate:date, isEditing:false})
        this.props.onSubmitEditing(new Date(date).toJSON())
        return
      }
    }
    this.setState({date:this.state.orgDate, isEditing:false})
  }
  onCancel = () => {
    this.setState({date:this.state.orgDate, isEditing:false})
  }

  render () {
    const { title } = this.props
    return (
      <View style={styles.container}>
        <Text style={{}}>{title} </Text>
        { (this.state.isEditing)
          ? (
            <View style={{flex:1, flexDirection:'row'}}>
              <TextInput
                style={{flex:2, height: 20, borderColor: 'gray', borderWidth: 1}}
                onChangeText={this.onChangeText}
                value={this.state.date}
              />
              <Button title='Save' onPress={this.onSave} />
              <Button title='Cancel' onPress={this.onCancel} />
            </View>
          ) : (
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{}}>{this.state.date}</Text>
              <Button style={{height:12}} title='Edit' onPress={this.onEdit} />
            </View>
          )
        }
      </View>
    )
  }
}

// // Prop type warnings
// DateInput.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// DateInput.defaultProps = {
//   someSetting: false
// }
