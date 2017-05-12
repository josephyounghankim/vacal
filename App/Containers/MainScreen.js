import React from 'react'
import { ScrollView, Text, Button } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MainScreenStyle'

class MainScreen extends React.Component {

  static navigationOptions = {
    title: 'MainScreen2'
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }


  render () {
    const { navigate } = this.props.navigation

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.sectionText}>MainScreen Container!!!</Text>
        <Text style={styles.sectionText}>MainScreen Container!!!2</Text>
        <Text style={styles.mainText}>MainScreen Container!!!3</Text>
        <Text style={styles.titleText}>MainScreen Container!!!4</Text>
        <Button
          title="Go to LaunchScreen"
          onPress={() => navigate('LaunchScreen', { title: 'kkk'}) }
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
