import { configureStore, combineReducers } from '@reduxjs/toolkit'
import counterReducer from './counter/counter.slide';
import userReducer from './user/user.slide'
import appReducer from './app/app.slide';
import blogReducer from './blog/blog.slide';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['app']
}
const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    app: appReducer,
    blog: blogReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

// export const store = configureStore({
//     reducer: {

//     },
// })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch