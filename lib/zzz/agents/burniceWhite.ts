import {
  DefaultAgentDriveMainstatCount
} from "@/lib/zzz/stats/discStats";
import {Agent} from "@/lib/zzz/core/Agent";
import {buff, BuffLabels, DefaultBuffCounts} from "@/lib/zzz/buffs/buffs";
import {AgentDiscDrives, DefaultDiscs, DefaultDiscValues} from "@/lib/zzz/disc-drives/discDrive";
import {FusionCompiler, SharpenedStinger} from "@/lib/zzz/wengine/wengines";

export const BurniceWhite: Agent = {
  label: "Burnice White",

  // TODO imagery/branding/colour per agent
  // TODO atk vs. anomaly vs. support etc

  baseStats: {
    hp: 7368,
    atk: 863,
    def: 601,
    impact: 83,
    critRate: 0.05,
    critDmg: 0.5,
    anomalyMastery: 118,
    anomalyProficiency: 120,
    penRatio: 0,
    energyRegen: 0.0156
  },

  // inherent buffs - non editable
  agentBuffs: [

  ],

  customBuffs: [
    buff("anomalyProficiency", 30, "Chaos Jazz 2pc"),
    buff("attributeDamagePercent", 0.15, "Chaos Jazz 4pc"),
    buff("anomalyProficiency", 30, "Freedom Blues 2pc"),

    // Caesar
    buff("finalAtkFlat", 1000, "Caesar Core"),
    buff("dmgTaken", 0.25, "Caesar Additional")
  ],

  discDrives: DefaultDiscs.slice() as AgentDiscDrives,

  wengine: FusionCompiler
}
