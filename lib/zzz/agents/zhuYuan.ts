import {
  DefaultAgentDriveMainstatCount
} from "@/lib/zzz/stats/discStats";
import {Agent} from "@/lib/zzz/core/Agent";
import {buff, DefaultBuffCounts} from "@/lib/zzz/buffs/buffs";
import {AgentDiscDrives, DefaultDiscs} from "@/lib/zzz/disc-drives/discDrive";
import {SharpenedStinger, StarlightEngine} from "@/lib/zzz/wengine/wengines";

export const ZhuYuan: Agent = {
  label: "Zhu Yuan",

  // TODO imagery/branding/colour per agent
  // TODO atk vs. anomaly vs. support etc

  baseStats: {
    def: 601,
    hp: 7483,
    atk: 919,
    critRate: 0.05,
    critDmg: 0.788,
    penRatio: 0,
    impact: 90,
    anomalyMastery: 93,
    anomalyProficiency: 92,
    energyRegen: 0.012
  },

  agentBuffs: [
    buff("attributeDamagePercent", 0.8, "Core DMG in stun"),
    buff("critRate", 0.3, "Core crit rate after EX, Chain, Ult"),
  ],
  customBuffs: [
    buff("defShred", 0.4, "Nicole Core DEF Shred"),
    buff("attributeDamagePercent", 0.25, "Nicole Ether DMG%"),
    buff("critRate", 0.15, "Nicole C6"),

    buff("critRate", 0.08, "Woodpecker 2pc"),
    buff("attributeDamagePercent", 0.1, "Chaotic Metal 2pc"),
    buff("critDmg", 0.53, "Chaotic Metal 4pc")
  ],

  discDrives: DefaultDiscs.slice() as AgentDiscDrives,

  wengine: StarlightEngine,
}
