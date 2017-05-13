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
  startDate: new Date('2017-05-01'),
  maxVacDays: 20,
  vacDays: []
})

/* ------------- Reducers ------------- */

// request the data from an api
export const requestAll = state => {
  const vacDays = [
    { date: new Date('2017-05-02'), type: 'full' },
    { date: new Date('2017-05-04'), type: 'half' }
  ]
  return state.merge({ vacDays })
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
