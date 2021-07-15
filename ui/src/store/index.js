import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import RootReducer from "./reducers/root";

const logger = createLogger();

const middlewares = [logger];

const store = createStore(RootReducer, applyMiddleware(...middlewares));

export default store;
