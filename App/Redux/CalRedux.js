import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addVacDay: ['vacDay'],
  removeVacDay: ['vacDay'],
  updateVacDay: ['date'],
  updateStartDate: ['startDate'],
  updateMaxVacDays: ['maxVacDays'],
  fetchSampleData: null
})

export const CalTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  startDate: new Date('2016-01-01').toJSON(),
  maxVacDays: 20,
  vacDays: []
})

/* ------------- Reducers ------------- */

// request the data from an api
export const fetchSampleData = state => {
  const vacDays = [
    { date: new Date('2016-12-27').toJSON(), type: 'full' },
    { date: new Date('2016-12-28').toJSON(), type: 'full' },
    { date: new Date('2016-12-29').toJSON(), type: 'full' },
    { date: new Date('2017-01-31').toJSON(), type: 'half1' },
    { date: new Date('2017-02-01').toJSON(), type: 'half2' },
    { date: new Date('2017-02-23').toJSON(), type: 'full' },
    { date: new Date('2017-02-24').toJSON(), type: 'full' },
    { date: new Date('2017-02-27').toJSON(), type: 'full' },
    { date: new Date('2017-03-31').toJSON(), type: 'full' },
    { date: new Date('2017-04-03').toJSON(), type: 'half1' },
    { date: new Date('2017-04-17').toJSON(), type: 'half1' },
    { date: new Date('2017-04-18').toJSON(), type: 'half2' },
    { date: new Date('2017-05-02').toJSON(), type: 'full' },
    { date: new Date('2017-05-04').toJSON(), type: 'full' },
    { date: new Date('2017-05-29').toJSON(), type: 'half1' }
  ]
  const startDate = new Date('2016-09-14').toJSON()

  return state.merge({ startDate, vacDays })
}

export const toggleVacDay = (state, action) => {
  const { date } = action
  const vacDays = Immutable.asMutable(state.vacDays, {deep: true})
  const vDays = vacDays.filter(vday => (vday.date === date.toJSON()))
  if (vDays.length < 1) {
    vacDays.push({ date: date.toJSON(), type: 'full' })
  } else {
    const v = vDays[0]
    if (v.type === 'full') v.type = 'half1'
    else if (v.type === 'half1') v.type = 'half2'
    else if (v.type === 'half2') vacDays.splice(vacDays.indexOf(v),1)
  }
  return state.merge({ vacDays })
}

export const updateStartDate = (state, action) => {
  const { startDate } = action
  return state.merge({ startDate })
}

export const updateMaxVacDays = (state, action) => {
  const { maxVacDays } = action
  return state.merge({ maxVacDays })
}

// // successful api lookup
// export const success = (state, action) => {
//   const { payload } = action
//   return state.merge({ fetching: false, error: null, payload })
// }

// // Something went wrong somewhere.
// export const failure = state =>
//   state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_SAMPLE_DATA]: fetchSampleData,
  [Types.UPDATE_VAC_DAY]: toggleVacDay,
  [Types.UPDATE_START_DATE]: updateStartDate,
  [Types.UPDATE_MAX_VAC_DAYS]: updateMaxVacDays
})
