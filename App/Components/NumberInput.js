import React from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import styles from './Styles/NumberInputStyle'

export default class NumberInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      number: props.number,
      orgNumber: props.number,
      isEditing: false
    }
  }
  componentWillReceiveProps (newProps) {
    const {number} = newProps
    this.setState({number, orgNumber:number})
  }
  onChangeText = (text) => {
    this.setState({number:text})
  }
  onEdit = () => {
    this.setState({isEditing:true})
  }
  onSave = () => {
    const number = parseInt(this.state.number) || -1
    if (number>=0 && number<100) {
      this.setState({orgNumber:''+number, isEditing:false})
      this.props.onSubmitEditing(''+number)
      return
    }
    this.setState({number:this.state.orgNumber, isEditing:false})
  }
  onCancel = () => {
    this.setState({number:this.state.orgNumber, isEditing:false})
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
                style={{flex:2, height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={this.onChangeText}
                value={this.state.number}
              />
              <Button title='Save' onPress={this.onSave} />
              <Button title='Cancel' onPress={this.onCancel} />
            </View>
          ) : (
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{}}>{this.state.number}</Text>
              <Button style={{height:12}} title='Edit' onPress={this.onEdit} />
            </View>
          )
        }
      </View>
    )
  }
}

// // Prop type warnings
// NumberInput.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// NumberInput.defaultProps = {
//   someSetting: false
// }
