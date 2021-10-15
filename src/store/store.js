import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "../saga/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: { auth:authReducer },
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga);

export default store;