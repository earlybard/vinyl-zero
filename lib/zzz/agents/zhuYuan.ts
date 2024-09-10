import {
  DefaultAgentDriveMainstatCount
} from "@/lib/zzz/stats/discStats";
import {Agent} from "@/lib/zzz/core/Agent";
import {DefaultBuffValues} from "@/lib/zzz/core/buffs";
import {AgentDiscDrives, DefaultDiscs} from "@/lib/zzz/disc-drives/discDrive";
import {SharpenedStinger} from "@/lib/zzz/wengine/wengines";

export const ZhuYuan: Agent = {
  label: "Zhu Yuan",

  // TODO imagery/branding/colour per agent
  // TODO atk vs. anomaly vs. support etc

  // PLACEHOLDER VALUES
  baseStats: {
    def: 607,
    hp: 7789,
    atk: 1000,
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

  discDrives: DefaultDiscs.slice() as AgentDiscDrives,

  wengine: SharpenedStinger,
}
