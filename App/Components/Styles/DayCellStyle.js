import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 50,
    maxHeight: 50,
    // paddingTop: Metrics.titlePadding,
    backgroundColor: 'lightgreen'
  },
  fullday: {
    backgroundColor: 'red'
  },
  half1day: {
    backgroundColor: 'blue'
  },
  half2day: {
    backgroundColor: 'cyan'
  },
  sundayText: {
    color: 'red'
  },
  satdayText: {
    color: 'green'
  }
})
