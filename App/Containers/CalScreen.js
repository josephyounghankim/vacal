import React from 'react'
import { View, Text, ListView, Button } from 'react-native'
import { connect } from 'react-redux'
import WeekRow from '../Components/WeekRow'
import CalActions from '../Redux/CalRedux'

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/CalScreenStyle'

class CalScreen extends React.Component {

  state: {
    dataSource: Object
  }

  handlePress = date => {
    console.log('handlePress:', date)
    this.props.updateVacDay(date)
  }

  calculateWeekObjects = cal => {
    const { startDate, vacDays } = cal
    let realStartDate = new Date(startDate)
    realStartDate = new Date(realStartDate.getTime() - (realStartDate.getDay() + 14) * 3600 * 24 * 1000 )

    const weekObjects = []
    for(let i=0; i < 70; i++) {
      const sDate = new Date(realStartDate.getTime() + i * (7 * 3600 * 24 * 1000)).toJSON()
      const eDate = new Date(new Date(sDate).getTime() + (7 * 3600 * 24 * 1000)).toJSON()
      const vDays = vacDays.filter(vday => (vday.date >= sDate && vday.date < eDate ))
      // if (vDays.length>0) console.log( 'vacDays && vDays:', vacDays, vDays)
      const s = new Date(sDate)
      const checkSum = vDays.reduce(((acc, vday) => {
        const d = new Date(vday.date)
        const diff = (d.getTime() - s.getTime())/(3600 * 24 * 1000)
        const t = (vday.type === 'full') ? 8 : 0
        // console.log('diff, t', s, d, diff, t)
        return acc | (((2 << diff)) << t)
      }), 0)
      weekObjects.push({ idx: i, sDate, vDays, checkSum, handlePress: this.handlePress })
    }
    return weekObjects
  }

  constructor (props) {
    super(props)
    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/

    /* ***********************************************************
    * STEP 2
    * Teach datasource how to detect if rows are different
    * Make this function fast!  Perhaps something like:
    *   (r1, r2) => r1.id !== r2.id}
    *************************************************************/
    const rowHasChanged = (r1, r2) => r1.checkSum !== r2.checkSum

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(this.calculateWeekObjects(props.cal))
    }
  }

  componentWillMount () {
    // this.props.vacDaysRequest()
  }

  /* ***********************************************************
  * STEP 3
  * `renderRow` function -How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={rowData.title} description={rowData.description} />
  *************************************************************/
  renderRow (rowData) {
    // console.log( rowData )
    return (
      <View style={{flex: 1, flexDirection: 'row', height: 70}}>
        <WeekRow weekData={rowData} handlePress={rowData.handlePress}/>
      </View>
    )
    // <Text style={{color:'black'}}>{rowData.title}</Text>
    // <Text style={{color:'black'}}>{rowData.description}</Text>
  }

  /* ***********************************************************
  * STEP 4
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
    componentWillReceiveProps (newProps) {
      if (newProps.someData) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newProps.someData)
        })
      }
    }
  *************************************************************/
  componentWillReceiveProps (newProps) {
    if (newProps.cal) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.calculateWeekObjects(newProps.cal))
      })
    }
  }


  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  // Render a footer.
  renderFooter = () => {
    return (
      <Text> - Footer - </Text>
    )
  }

  render () {
    const { startDate, maxVacDays, vacDays } = this.props.cal
    // console.log( 'vacDays:', vacDays, vacDays.length )

    const sTime = new Date(startDate).getTime()
    const aYearTime = 365 * 24 * 3600 * 1000
    const daysCount = vacDays.reduce((count, day) => {
      const dTime = new Date(day.date).getTime()
      if (dTime >= sTime && dTime < (sTime + aYearTime)) {
        if (day.type === 'half') return count + 0.5
        return count + 1.0
      }
      return count
    }, 0)

    return (
      <View style={styles.container}>
        <Text>Hello ListView</Text>
        <Text>Start Date:{startDate}</Text>
        <Text>Days Left:{maxVacDays - daysCount}</Text>
        <Text>Max Days:{maxVacDays}</Text>
        <Button
          title='Fetch VacDays'
          onPress={() => this.props.vacDaysRequest()}
        />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderFooter={this.renderFooter}
          enableEmptySections
          pageSize={15}
        />
      </View>
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
    vacDaysRequest: () => dispatch(CalActions.vacDaysRequest()),
    addVacDay: vacDay => dispatch(CalActions.addVacDay(vacDay)),
    updateVacDay: date => dispatch(CalActions.updateVacDay(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalScreen)
