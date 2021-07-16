import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import RootReducer from "./reducers/root";
import RootSaga from "./sagas/root";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter(Boolean);

const store = createStore(RootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(RootSaga);

export default store;
