import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Agent} from "@/lib/zzz/core/Agent";
import {JaneDoe} from "@/lib/zzz/agents/janeDoe";
import {ZhuYuan} from "@/lib/zzz/agents/zhuYuan";
import {DiscDrive, DriveSubstat, SubstatLevel} from "@/lib/zzz/disc-drives/discDrive";

export interface AgentState {
    agents: Agent[]
    selectedAgent: Agent
}

const initialState: AgentState = {
    agents: [
        JaneDoe,
        ZhuYuan
    ],
    selectedAgent: JaneDoe
}

export const agentSlice = createSlice({
    name: 'agent',
    initialState,
    reducers: {
        /**
         * Change the currently selected Agent.
         */
        selectAgent: (state, payload: PayloadAction<Agent | null>) => {

            const index = state.agents.findIndex(x => x.label === payload.payload?.label)
            const selectedAgent = state.agents[index]

            if (selectedAgent) {
                state.selectedAgent = selectedAgent
            }
        },
        updateDisc: (state, payload: PayloadAction<{ i: number, drive: DiscDrive }>) => {
            state.selectedAgent.discDrives[payload.payload.i] = payload.payload.drive
        },
        setDiscSubstats: (state, payload: PayloadAction<{
            disc: number, substats: DriveSubstat[]
        }>) => {
            const p = payload.payload
            state.selectedAgent.discDrives[p.disc].subStats = p.substats
        },
        setDiscSubstatLevel: (state, payload: PayloadAction<{
            disc: number, substat: number, level: SubstatLevel | null
        }>) => {
            const p = payload.payload
            state.selectedAgent.discDrives[p.disc].subStats[p.substat].level = p.level ?? 0
        }
    }
})

export const agentActions = agentSlice.actions
export const agentReducer = agentSlice.reducer