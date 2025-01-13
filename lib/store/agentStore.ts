import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Agent} from "@/lib/zzz/core/Agent";
import {JaneDoe} from "@/lib/zzz/agents/janeDoe";
import {ZhuYuan} from "@/lib/zzz/agents/zhuYuan";
import {DiscDrive, DriveMainstat, DriveSubstat, SubstatLevel} from "@/lib/zzz/disc-drives/discDrive";
import {DriveMainstatLabel} from "@/lib/zzz/stats/discStats";
import {Wengine} from "@/lib/zzz/core/Wengine";
import {Buff, BuffLabels, BuffValue} from "@/lib/zzz/buffs/buffs";
import {BurniceWhite} from "@/lib/zzz/agents/burniceWhite";
import {Yanagi} from "@/lib/zzz/agents/yanagi";
import {HoshimiMiyabi} from "@/lib/zzz/agents/hoshimiMiyabi";
import {Harumasa} from "@/lib/zzz/agents/harumasa";
import {Harumasa2} from "@/lib/zzz/agents/harumasa";

export interface AgentState {
    agents: Agent[]
    i: number
}

const initialState: AgentState = {
    agents: [
        JaneDoe,
        ZhuYuan,
        BurniceWhite,
        Yanagi,
        HoshimiMiyabi,
        Harumasa,
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
        createAgentBuff: (state) => {
            const buff: BuffValue = {
                key: "basicAtkFlat",
                value: 0,
                label: BuffLabels.basicAtkFlat,
                description: "",
                id: Math.random()
            }
            state.agents[state.i].agentBuffs.push(buff)
        },
        deleteAgentBuff: (state, payload: PayloadAction<number>) => {
            const buffs = state.agents[state.i].agentBuffs
            const buff = buffs.findIndex(x => x.id === payload.payload)
            if (buff === -1) return
            buffs.splice(buff, 1)
        },
        updateAgentBuff: (state, payload: PayloadAction<BuffValue>) => {
            const buffs = state.agents[state.i].agentBuffs
            const buff = buffs.findIndex(x => x.id === payload.payload.id)
            buffs[buff] = payload.payload
        },
        createCustomBuff: (state) => {
            const buff: BuffValue = {
                key: "basicAtkFlat",
                value: 0,
                label: BuffLabels.basicAtkFlat,
                description: "",
                id: Math.random()
            }
            state.agents[state.i].customBuffs.push(buff)
        },
        deleteCustomBuff: (state, payload: PayloadAction<number>) => {
            const buffs = state.agents[state.i].customBuffs
            const buff = buffs.findIndex(x => x.id === payload.payload)
            if (buff === -1) return
            buffs.splice(buff, 1)
        },
        updateCustomBuff: (state, payload: PayloadAction<BuffValue>) => {
            const buffs = state.agents[state.i].customBuffs
            const buff = buffs.findIndex(x => x.id === payload.payload.id)
            buffs[buff] = payload.payload
        },
        createWengineBuff: (state) => {
            const buff: BuffValue = {
                key: "basicAtkFlat",
                value: 0,
                label: BuffLabels.basicAtkFlat,
                description: "",
                id: Math.random()
            }
            state.agents[state.i].wengine?.buffs2.push(buff)
        },
        deleteWengineBuff: (state, payload: PayloadAction<number>) => {
            const buffs = state.agents[state.i].wengine?.buffs2
            if (buffs == undefined) return;

            const buff = buffs.findIndex(x => x.id === payload.payload)
            if (buff === -1) return
            buffs.splice(buff, 1)
        },
        updateWengineBuff: (state, payload: PayloadAction<BuffValue>) => {
            const buffs = state.agents[state.i].wengine?.buffs2
            if (buffs == undefined) return;

            const buff = buffs.findIndex(x => x.id === payload.payload.id)
            buffs[buff] = payload.payload
        },
        selectAgent: (state, payload: PayloadAction<Agent | null>) => {

            state.i = state.agents.findIndex(x => x.label === payload.payload?.label)
        },
        setWengine: (state, payload: PayloadAction<{wengine: Wengine | null}>) => {
            state.agents[state.i].wengine = payload.payload.wengine
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