import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Agent} from "@/lib/zzz/core/Agent";
import {JaneDoe} from "@/lib/zzz/agents/janeDoe";
import {ZhuYuan} from "@/lib/zzz/agents/zhuYuan";
import {DiscDrive, DriveMainstat, DriveSubstat, SubstatLevel} from "@/lib/zzz/disc-drives/discDrive";
import {DriveMainstatLabel} from "@/lib/zzz/stats/discStats";

export interface AgentState {
    agents: Agent[]
    i: number
}

const initialState: AgentState = {
    agents: [
        JaneDoe,
        ZhuYuan
    ],
    i: 0
}

export const agentSlice = createSlice({
    name: 'agent',
    initialState,
    reducers: {
        /**
         * Change the currently selected Agent.
         */
        selectAgent: (state, payload: PayloadAction<Agent | null>) => {

            state.i = state.agents.findIndex(x => x.label === payload.payload?.label)
        },
        updateDisc: (state, payload: PayloadAction<{ i: number, drive: DiscDrive }>) => {
            state.agents[state.i].discDrives[payload.payload.i] = payload.payload.drive
        },
        setDiscMainstat: (state, payload: PayloadAction<{disc: number, mainstat: DriveMainstat | null}>) => {
            const p = payload.payload
            state.agents[state.i].discDrives[p.disc].mainStat = p.mainstat
        },
        setDiscSubstats: (state, payload: PayloadAction<{
            disc: number, substats: DriveSubstat[]
        }>) => {
            const p = payload.payload
            state.agents[state.i].discDrives[p.disc].subStats = p.substats
        },
        setDiscSubstatLevel: (state, payload: PayloadAction<{
            disc: number, substat: number, level: SubstatLevel | null
        }>) => {
            const p = payload.payload
            state.agents[state.i].discDrives[p.disc].subStats[p.substat].level = p.level ?? 0
        }
    }
})

export const agentActions = agentSlice.actions
export const agentReducer = agentSlice.reducer