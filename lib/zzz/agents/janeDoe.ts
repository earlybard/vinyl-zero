import {
  DefaultAgentDriveMainstatCount
} from "@/lib/zzz/stats/discStats";
import {Agent} from "@/lib/zzz/core/Agent";
import {BuffLabels, DefaultBuffCounts} from "@/lib/zzz/buffs/buffs";
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
    ...DefaultBuffCounts,
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

  // inherent buffs - non editable
  buffs2: [
    {
      id: 0,
      key: "anomalyProficiency",
      label: BuffLabels.anomalyProficiency,
      value: 100,
      description: "Seth Buff"
    },
    {
      id: 1,
      key: "anomalyDamageMultiplier",
      label: BuffLabels.anomalyDamageMultiplier,
      value: 0.5,
      description: "Assault Crit for +50% DMG"
    },
    {
      id: 2,
      key: "anomalyBuildupRate",
      label: BuffLabels.anomalyBuildupRate,
      value: 0.35,
      description: "Core Passive"
    },
    {
      id: 3,
      key: "finalAtkFlat",
      label: BuffLabels.finalAtkFlat,
      value: 440,
      description: "Core Passive"
    }
  ],

  // extra buffs -editable - empty array

  discDrives: DefaultDiscs.slice() as AgentDiscDrives,

  wengine: SharpenedStinger
}
