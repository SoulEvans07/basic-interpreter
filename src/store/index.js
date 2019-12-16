import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import _ from 'lodash'

import initialState from './initialState'
import { routeActionTypes } from '../actions/routeActions'


function setRoute(state, payload) {
  return { ...state, prevRoute: state.route, route: payload.route }
}

function backRoute(state, payload) {
  return { ...state, route: state.prevRoute }
}

function rootReducer(state, action) {
  switch (action.type) {
    case routeActionTypes.SET_ROUTE:
      return setRoute(state, action.payload)
    case routeActionTypes.BACK_ROUTE:
      return backRoute(state, action.payload)
    default:
      return state
  }
}


const localstorage_object = 'visual_novel_template'
// const loadState = function() {
//   try {
//     const serializedState = localStorage.getItem(localstorage_object);
//     if (serializedState === null) {
//       return initialState
//     }
//     return { ...initialState, ...JSON.parse(serializedState) }
//   } catch (err) {
//     return initialState
//   }
// }

const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

store.subscribe(() => {
  const currentState = store.getState()
  const serializedState = JSON.stringify(currentState)
  localStorage.setItem(localstorage_object, serializedState)
})

export default store
