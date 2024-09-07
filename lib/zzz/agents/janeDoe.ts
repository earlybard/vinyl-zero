import {
  DefaultAgentDriveMainstatCount
} from "@/lib/zzz/stats/discStats";
import {Agent} from "@/lib/zzz/core/Agent";
import {DefaultBuffValues} from "@/lib/zzz/stats/buffs";
import {AgentDiscDrives, DefaultDiscs, DefaultDiscValues} from "@/lib/zzz/disc-drives/discDrive";

export const JaneDoe: Agent = {
  label: "Jane Doe",

  // TODO imagery/branding/colour per agent
  // TODO atk vs. anomaly vs. support etc

  baseStats: {
    def: 607,
    hp: 7789,
    atk: 881,
    critRate: 0.05,
    critDmg: 0.5,
    penRatio: 0,
    impact: 86,
    anomalyMastery: 150,
    anomalyProficiency: 112,
    energyRegen: 0.012
  },

  buffs: {
    ...DefaultBuffValues,
    penPercent: 0.32,
    finalAtkFlat: 440,
    attributeDamagePercent: 0.55
  },

  discDrives: DefaultDiscs.slice() as AgentDiscDrives
}
