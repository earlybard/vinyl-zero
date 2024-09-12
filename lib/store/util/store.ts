import { configureStore } from '@reduxjs/toolkit'
import {agentReducer} from "@/lib/store/agentStore";
import {enemyReducer} from "@/lib/store/enemyStore";

export const makeStore = () => {
    return configureStore({
        reducer: {
            agent: agentReducer,
            enemy: enemyReducer
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']