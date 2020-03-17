import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";

import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

export default { store };
