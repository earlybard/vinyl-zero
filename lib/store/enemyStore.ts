import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Agent} from "@/lib/zzz/core/Agent";
import {JaneDoe} from "@/lib/zzz/agents/janeDoe";
import {ZhuYuan} from "@/lib/zzz/agents/zhuYuan";
import {DiscDrive, DriveMainstat, DriveSubstat, SubstatLevel} from "@/lib/zzz/disc-drives/discDrive";
import {DriveMainstatLabel} from "@/lib/zzz/stats/discStats";
import {Wengine} from "@/lib/zzz/core/Wengine";

export interface EnemyState {
    def: number
}

const initialState: EnemyState = {
    def: 953
}

export const enemySlice = createSlice({
    name: 'enemy',
    initialState,
    reducers: {
        /**
         * Change the currently selected Agent.
         */
        setDef: (state, payload: PayloadAction<string>) => {
            state.def = parseInt(payload.payload)
        }
    }
})

export const enemyActions = enemySlice.actions
export const enemyReducer = enemySlice.reducer