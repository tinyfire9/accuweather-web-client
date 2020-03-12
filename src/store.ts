import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export let store = createStore(() => ({}), applyMiddleware(thunk));