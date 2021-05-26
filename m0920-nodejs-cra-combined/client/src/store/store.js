import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from '../reducers'

const persistConfig = {
    key: 'root',
    storage
}

const middleware = process.env.NODE_ENV === 'production' ? [thunk] : [thunk, ]
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, {}, applyMiddleware(...middleware))
export const persistor = persistStore(store)