import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import allReducers from './reducers';
import rootSaga from '../sagas';

const DEV_TOOLS = 'window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()';
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({
  sagaMiddleware,
  DEV_TOOLS,
});

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
