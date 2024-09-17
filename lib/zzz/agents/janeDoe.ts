import {
  DefaultAgentDriveMainstatCount
} from "@/lib/zzz/stats/discStats";
import {Agent} from "@/lib/zzz/core/Agent";
import {buff, BuffLabels, DefaultBuffCounts} from "@/lib/zzz/buffs/buffs";
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
    anomalyProficiency: 114, // 114 + 100 + 90 +
    penRatio: 0,
    energyRegen: 0.012
  },

  // inherent buffs - non editable
  agentBuffs: [
    buff("anomalyDamageMultiplier", 0.5, "Assault Crit for +50% DMG"),
    buff("anomalyBuildupRate", 0.35, "Core Passive"),
    buff("finalAtkFlat", 440, "Core Passive")
  ],

  customBuffs: [
    buff("anomalyProficiency", 100, "Seth Buff"),
    buff("anomalyProficiency", 30, "Freedom Blues 2pc"),
    buff("attributeDamagePercent", 0.1, "Fanged Metal 2pc"),
    buff("dmgTaken", 0.35, "Fanged Metal 4pc")
  ],

  discDrives: DefaultDiscs.slice() as AgentDiscDrives,

  wengine: SharpenedStinger
}
