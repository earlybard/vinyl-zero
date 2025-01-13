import {combineReducers, configureStore } from '@reduxjs/toolkit'
import {agentReducer} from "@/lib/store/agentStore";
import {enemyReducer} from "@/lib/store/enemyStore";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
    agent: agentReducer,
    enemy: enemyReducer
})

// Create a persist configuration
const persistConfig = {
    key: 'persist',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']