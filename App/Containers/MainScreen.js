import React from 'react'
import { ScrollView, View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import CalActions from '../Redux/CalRedux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MainScreenStyle'

class MainScreen extends React.Component {
  // static propTypes = {
  //   dispatch: PropTypes.func,
  //   fetching: PropTypes.bool,
  //   attemptLogin: PropTypes.func
  // }

  static navigationOptions = {
    title: 'MainScreen2'
  }

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    const { navigate } = this.props.navigation
    const { vacDays } = this.props.cal

    console.log(vacDays)

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.sectionText}>MainScreen Container!!!</Text>
        <Text style={styles.sectionText}>MainScreen Container!!!2</Text>
        <Text style={styles.mainText}>MainScreen Container!!!3</Text>
        <Text style={styles.titleText}>MainScreen Container!!!4</Text>
        <Button
          title='Go to LaunchScreen'
          onPress={() => navigate('LaunchScreen', {title: 'kkk'})}
        />
        <Button
          title='Fetch VacDays'
          onPress={() => this.props.vacDaysRequest()}
        />
        <View>
          {vacDays.map(day => (<Text key={day.date}>{day.date.toString()} {day.type}</Text>))}
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cal: state.cal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    vacDaysRequest: () => dispatch(CalActions.vacDaysRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
