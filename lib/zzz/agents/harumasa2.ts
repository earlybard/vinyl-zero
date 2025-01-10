import {Mainstats, substat} from "@/lib/zzz/stats/discStats";
import {Agent} from "@/lib/zzz/core/Agent";
import {buff} from "@/lib/zzz/buffs/buffs";
import {HailstormShrine, StarlightEngine} from "@/lib/zzz/wengine/wengines";

export const Harumasa2: Agent = {
  label: "Harumasa 2",

  // TODO imagery/branding/colour per agent
  // TODO atk vs. anomaly vs. support etc

  baseStats: {
    hp: 7405,
    atk: 915,
    def: 600,
    impact: 90,
    critRate: 0.194,
    critDmg: 0.5,
    anomalyMastery: 80,
    anomalyProficiency: 95,
    penRatio: 0,
    energyRegen: 0.012
  },

  // inherent buffs - non editable
  agentBuffs: [
    buff("critRate", 0.25, "Core dash attack"),
    buff("critDmg", 0.12 * 6, "Core dash attack gleaming edge"),
    buff("attributeDamagePercent", 0.4, "Additional ability")
  ],

  customBuffs: [
    // buff("critRate", 0.08, "Woodpecker 2pc"),
    buff("attributeDamagePercent", 0.1, "Thunder 2pc"),
    buff("finalAtkPercent", 0.28, "Thunder 4pc"),
    buff("critDmg", 0.16, "Branch 2pc"),

    buff("defShred", 0.4, "Nicole Core DEF Shred"),
    buff("critRate", 0.15, "Nicole C6")
  ],

  discDrives: [
    {mainStat: Mainstats.hpFlat, subStats: [
        substat("penFlat", 1),
        substat("critRate", 1),
        substat("anomalyProficiency"),
        substat("atkPercent", 2)
    ]},
    {mainStat: Mainstats.atkFlat, subStats: [
        substat("critDmg", 1),
        substat("critRate", 1),
        substat("atkPercent", 2),
    ]},
    {mainStat: Mainstats.defFlat, subStats: [
        substat("critRate", 0),
        substat("critDmg", 1),
        substat("atkPercent", 2),
    ]},
    {mainStat: Mainstats.critDmg, subStats: [
        substat("critRate", 2),
        substat("atkPercent", 1),
    ]},
    {mainStat: Mainstats.attributeDamagePercent, subStats: [
        substat("atkPercent", 3),
        substat("anomalyProficiency"),
      ]},
    {mainStat: Mainstats.atkPercent, subStats: [
        substat("critDmg", 1),
        substat("critRate", 2),
        substat("penFlat", 1),
    ]},
],

  wengine: StarlightEngine
}
