import React from 'react'
import { View, Text, ListView, Button, BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import WeekRow from '../Components/WeekRow'
import CalActions from '../Redux/CalRedux'
import DateInput from '../Components/DateInput'
import NumberInput from '../Components/NumberInput'

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/CalScreenStyle'

BackAndroid.addEventListener('hardwareBackPress', () => true)

class CalScreen extends React.Component {

  state: {
    dataSource: Object
  }

  handlePress = (date, weekIdx) => {
    console.log('handlePress:', date, weekIdx)
    this._curWeekIdx = weekIdx
    this.props.updateVacDay(date)
  }

  handleSubmitStartDate = (startDate) => {
    console.log('handleSubmitStartDate:', startDate)
    this._curWeekIdx = -1 // refresh all
    this.props.updateStartDate(startDate)
  }

  handleSubmitMaxVacDays = (maxVacDays) => {
    console.log('handleSubmitMaxVacDays:', maxVacDays)
    this._curWeekIdx = -1 // refresh all
    this.props.updateMaxVacDays(parseInt(maxVacDays))
  }

  calculateWeekObjects = cal => {
    console.log('calculateWeekObjects is called')
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
      }), realStartDate.getTime())
      weekObjects.push({ weekIdx: i, sDate, eDate, vDays, checkSum, handlePress: this.handlePress })
    }
    this._lastWeekObjects = weekObjects.concat()
    this._curWeekIdx = -1
    return weekObjects
  }

  updateWeekObjects = cal => {
    console.log('updateWeekObjects is called', this._curWeekIdx)
    const { startDate, vacDays } = cal
    const arr = this._lastWeekObjects
    if (this._curWeekIdx < 0) {
      return this.calculateWeekObjects(cal) // refresh all
    }
    const wo = arr[this._curWeekIdx]

    const { sDate, eDate } = wo
    const vDays = vacDays.filter(vday => (vday.date >= sDate && vday.date < eDate ))
    const s = new Date(sDate)
    const checkSum = vDays.reduce(((acc, vday) => {
      const d = new Date(vday.date)
      const diff = (d.getTime() - s.getTime())/(3600 * 24 * 1000)
      const t = (vday.type === 'full') ? 0 : ((vday.type === 'half1') ? 8 : 16)
      return acc | (((2 << diff)) << t)
    }), 0)

    arr[this._curWeekIdx] = Object.assign({}, wo, {checkSum, vDays})
    this._lastWeekObjects = arr.concat()
    return arr
  }

  onFetchSampleData = () => {
    // fetch my sample data on 2016-2017
    this.props.fetchSampleData()
  }

  constructor (props) {
    super(props)
    console.log('constructor:', props)
    this._curWeekIdx = -1

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
    const rowHasChanged = (r1, r2) => {
      if (r1.weekIdx === 0) console.log('rowHasChanged r1 vs r2 :', r1, r2)
      return (r1.checkSum !== r2.checkSum)
    }

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(this.calculateWeekObjects(props.cal))
    }
  }

  componentWillMount () {
    console.log('componentWillMount:', this.props.cal)
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
      console.log('componentWillReceiveProps is called')
      let data = (this.state.dataSource.getRowCount()<1 || this.props.cal.startDate !== newProps.cal.startDate)
        ? this.calculateWeekObjects(newProps.cal)
        : this.updateWeekObjects(newProps.cal)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data)
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
    console.log( 'cal:', this.props.cal )

    const sTime = new Date(startDate).getTime()
    const aYearTime = 365 * 24 * 3600 * 1000
    const daysCount = vacDays.reduce((count, day) => {
      const dTime = new Date(day.date).getTime()
      if (dTime >= sTime && dTime < (sTime + aYearTime)) {
        if (day.type === 'half1' || day.type === 'half2') return count + 0.5
        return count + 1.0
      }
      return count
    }, 0)

    return (
      <View style={styles.container}>
        <Text>Vacation Calculator</Text>
        <DateInput date={startDate} title='Start Date:' onSubmitEditing={this.handleSubmitStartDate} />
        <NumberInput number={''+maxVacDays} title='Max Days:' onSubmitEditing={this.handleSubmitMaxVacDays} />
        <Text>Days Left:{maxVacDays - daysCount}</Text>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderFooter={this.renderFooter}
          enableEmptySections
          pageSize={15}
        />
        <Button title='Fetch SampleData' onPress={this.onFetchSampleData} />
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
    fetchSampleData: () => dispatch(CalActions.fetchSampleData()),
    updateVacDay: date => dispatch(CalActions.updateVacDay(date)),
    updateStartDate: startDate => dispatch(CalActions.updateStartDate(startDate)),
    updateMaxVacDays: maxVacDays => dispatch(CalActions.updateMaxVacDays(maxVacDays))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalScreen)
