import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './services/reducers'

export let store = createStore(reducer, applyMiddleware(thunk));