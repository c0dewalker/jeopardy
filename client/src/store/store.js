import { createStore, applyMiddleware } from 'redux'
import reducer from './game'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const composeEnhancers = composeWithDevTools(applyMiddleware(logger, thunk))

const store = createStore(reducer, composeEnhancers)

export default store
