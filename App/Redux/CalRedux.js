import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addVacDay: ['vacDay'],
  removeVacDay: ['vacDay'],
  vacDaysRequest: null
})

export const CalTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  startDate: new Date('2016-09-14').toJSON(),
  maxVacDays: 20,
  vacDays: []
})

/* ------------- Reducers ------------- */

// request the data from an api
export const requestAll = state => {
  const vacDays = [
    { date: new Date('2016-12-27').toJSON(), type: 'full' },
    { date: new Date('2016-12-28').toJSON(), type: 'full' },
    { date: new Date('2016-12-29').toJSON(), type: 'full' },
    { date: new Date('2017-01-31').toJSON(), type: 'half' },
    { date: new Date('2017-02-01').toJSON(), type: 'half' },
    { date: new Date('2017-02-23').toJSON(), type: 'full' },
    { date: new Date('2017-02-24').toJSON(), type: 'full' },
    { date: new Date('2017-02-27').toJSON(), type: 'full' },
    { date: new Date('2017-03-31').toJSON(), type: 'full' },
    { date: new Date('2017-04-03').toJSON(), type: 'half' },
    { date: new Date('2017-04-17').toJSON(), type: 'half' },
    { date: new Date('2017-04-18').toJSON(), type: 'half' },
    { date: new Date('2017-05-02').toJSON(), type: 'full' },
    { date: new Date('2017-05-04').toJSON(), type: 'full' },
    { date: new Date('2017-05-29').toJSON(), type: 'half' }
  ]
  const startDate = new Date('2016-09-14').toJSON()

  return state.merge({ startDate, vacDays })
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
  [Types.VAC_DAYS_REQUEST]: requestAll
})
