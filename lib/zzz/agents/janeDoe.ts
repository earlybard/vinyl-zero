import {
  DefaultAgentDriveMainstatCount
} from "@/lib/zzz/stats/discStats";
import {Agent} from "@/lib/zzz/core/Agent";
import {DefaultBuffValues} from "@/lib/zzz/core/buffs";
import {AgentDiscDrives, DefaultDiscs, DefaultDiscValues} from "@/lib/zzz/disc-drives/discDrive";
import {SharpenedStinger} from "@/lib/zzz/wengine/wengines";

export const JaneDoe: Agent = {
  label: "Jane Doe",

  // TODO imagery/branding/colour per agent
  // TODO atk vs. anomaly vs. support etc

  baseStats: {
    hp: 7789,
    atk: 881,
    def: 607,
    impact: 86,
    critRate: 0.05,
    critDmg: 0.5,
    anomalyMastery: 148,
    anomalyProficiency: 114,
    penRatio: 0,
    energyRegen: 0.012
  },

  buffs: {
    ...DefaultBuffValues,
    // Seth
    anomalyProficiency: 100,

    // Rina
    // penPercent: 0.3,

    // Jane crits
    anomalyDamageMultiplier: 1.5,

    // Jane core passive
    anomalyBuildupRate: 0.35,

    // Jane core passive
    finalAtkFlat: 440,
  },

  discDrives: DefaultDiscs.slice() as AgentDiscDrives,

  wengine: SharpenedStinger
}
