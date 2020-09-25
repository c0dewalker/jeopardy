import { createStore } from 'redux'
import reducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const composeEnhancers = composeWithDevTools()

export default createStore(reducer, composeEnhancers)
